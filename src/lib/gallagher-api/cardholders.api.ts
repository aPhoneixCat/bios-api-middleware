import axios, { AxiosError, AxiosHeaders } from "axios"
import { HttpCode } from "../../constants"
import { IAPIEndpoint, EndpointConfig } from "../api-endpoint"
import Logger from "../logger"
import { GallagherCardholderSearchResponse, GallagherCreateCardholderRequest, GallagherCreateCardholderResponse, GallagherGetCardholderDetailResponse, GallagherUpdateCardholderRequest } from "../../domain/dtos/gallagher/cardholder"
import { AppError } from "../../errors/custom.error"
import { getAPIKey } from "./utils"
import { envs } from "../../config/env"

interface GallagherErrorMsgRes {
    message: string
}

export class Cardhodlers extends IAPIEndpoint {

    protected getConfig(): EndpointConfig {
        return {
            endpoint: '/api/cardholders',
            timeoutInMs: 5000,
            fields: ['defaults']
        }
    }

    /**
     * search cardholders
     * 
     * @returns 
     */
    async searchCardholderByStaffId(staffId: string): Promise<GallagherCardholderSearchResponse> {
        const url = this.endpointConfig.endpoint
        try {
            const { data } = await this.axiosClient.get<GallagherCardholderSearchResponse>(url, {
                headers: {
                    'Authorization': getAPIKey()
                },
                params: {
                    pdf_1006: `"${staffId}"` // double quote to enable exact search
                }
            })

            return data
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                throw AppError.internalServer(this.buildErrorMessage(error))
            }
            throw AppError.internalServerWrap(error)
        }
    }

    /**
     * Get detail of a cardholder
     * 
     * @param id cardholder id
     * @returns 
     */
    async get(cardholderId: string): Promise<GallagherGetCardholderDetailResponse> {
        const url = `${this.endpointConfig.endpoint}/${cardholderId}`
        try {
            const { data } = await this.axiosClient.get<GallagherGetCardholderDetailResponse>(url, {
                headers: {
                    'Authorization': getAPIKey()
                }
            })

            return data
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                throw AppError.internalServer(this.buildErrorMessage(error))
            }
            throw AppError.internalServerWrap(error)
        }
    }

    /**
     * Create a new cardholder
     * 
     * @param cardholder 
     * @returns 
     */
    async create(cardholder: GallagherCreateCardholderRequest): Promise<GallagherCreateCardholderResponse> {
        const url = `${this.endpointConfig.endpoint}`
        try {
            const { status, headers } = await this.axiosClient.post(url, cardholder, {
                headers: {
                    'Authorization': getAPIKey(),
                    'Content-Type': 'application/json'
                }
            })

            if (status != HttpCode.CREATED) {
                throw AppError.internalServer(`fail to create cardholder as http code is not ${HttpCode.CREATED}`)
            }

            if (headers instanceof AxiosHeaders) {
                Logger.info(`res headers = ${JSON.stringify(headers)}`)
                return {
                    cardholderId: this.extractIdFromURL(headers['location']),
                    href: headers['location']
                }
            } else {
                Logger.error('No cardholder href return');
                throw AppError.internalServer('No cardholder href return')
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                throw AppError.internalServer(this.buildErrorMessage(error))
            }
            throw AppError.internalServerWrap(error)
        }
    }

    /**
     * Update cardholder:
     * https://gallaghersecurity.github.io/cc-rest-docs/ref/cardholders.html#/definitions/Cardholder%20PATCH%20example
     * 
     * @param id 
     * @param requestBody
     * @returns 
     */
    async update(cardholderId: string, requstBody: GallagherUpdateCardholderRequest): Promise<void> {
        const url = `${this.endpointConfig.endpoint}/${cardholderId}`
        try {
            const { status } = await this.axiosClient.patch(url, requstBody, {
                headers: {
                    'Authorization': getAPIKey(),
                    'Content-Type': 'application/json'
                }
            })

            if (status != HttpCode.NO_CONTENT) {
                Logger.error('Deleting the cardholder failed');
                throw AppError.internalServer('Deleting the cardholder failed')
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                throw AppError.internalServer(this.buildErrorMessage(error))
            }

            throw AppError.internalServerWrap(error)
        }
    }

    /**
     * Refresh card to cardholder:
     * 
     * @param id 
     * @param requestBody
     * @returns 
     */
    async refreshCardOfCardholder(cardholderId: string, gallagherUpdateReq: GallagherUpdateCardholderRequest): Promise<void> {
        await this.update(cardholderId, gallagherUpdateReq)
    }

    /**
     * Remove cardholder:
     * https://gallaghersecurity.github.io/cc-rest-docs/ref/cardholders.html#/definitions/Cardholder%20PATCH%20example
     * 
     * @param id 
     * @param requestBody
     * @returns 
     */
    async remove(cardholderId: string): Promise<void> {
        const url = `${this.endpointConfig.endpoint}/${cardholderId}`
        try {
            const { data, status } = await this.axiosClient.delete(url, {
                headers: {
                    'Authorization': getAPIKey()
                }
            })

            if (status != HttpCode.NO_CONTENT) {
                Logger.error('Deleting the cardholder failed');
                throw AppError.internalServer('Deleting the cardholder failed')
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                throw AppError.internalServer(this.buildErrorMessage(error))
            }

            throw AppError.internalServerWrap(error)
        }
    }

    /**
     * Remove card from a cardholder: 
     * https://gallaghersecurity.github.io/cc-rest-docs/ref/cardholders.html#/definitions/Cardholder%20PATCH%20example
     * 
     * @param id 
     * @returns 
     */
    async removeCardFromCardholder(cardholderId: string, cardId: string): Promise<void> {
        const url = `${this.endpointConfig.endpoint}/${cardholderId}/cards/${cardId}`
        try {
            const { data, status } = await this.axiosClient.delete(url, {
                headers: {
                    'Authorization': getAPIKey()
                }
            })

            if (status != HttpCode.NO_CONTENT) {
                Logger.error('Deleting the cardholder failed');
                throw AppError.internalServer('Deleting the cardholder failed')
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                throw AppError.internalServer(this.buildErrorMessage(error))
            }
            throw AppError.internalServerWrap(error)
        }
    }

    private extractIdFromURL(url: string) {
        Logger.info("url = ", url)
        const urlPieces = url.split('/')
        return urlPieces[urlPieces.length - 1]
    }

    private buildErrorMessage(error: AxiosError) {
        const { response } = error;
        let errMsg;
        if (response) {
            errMsg = `${response.statusText}: ${JSON.stringify((response.data as GallagherErrorMsgRes).message)}`
        } else {
            errMsg = `${error.status || error.code}: ${error.message}`
        } 
    
        return errMsg;
    }
}

const CardholderAPI = new Cardhodlers(envs.GALLAGHER_API_URL)
export default CardholderAPI