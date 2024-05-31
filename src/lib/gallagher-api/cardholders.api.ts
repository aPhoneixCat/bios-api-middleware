import axios, { AxiosHeaders } from "axios"
import { HttpCode } from "../../constants"
import { IAPIEndpoint, EndpointConfig, getAPIKey } from "./api-endpoint"
import Logger from "../logger"
import { Card, GallagherCreateCardholderRequest, GallagherCreateCardholderResponse, GallagherGetCardholderDetailResponse, GallagherUpdateCardholderRequest } from "../../domain/dtos/gallagher/cardholder"
import { AppError } from "../../errors/custom.error"

export class Cardhodlers extends IAPIEndpoint {

    protected getConfig(): EndpointConfig {
        return {
            endpoint: '/api/cardholders',
            timeoutInMs: 5000,
            fields: ['defaults']
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
                throw AppError.internalServer(`${error.code}: ${error.message}`)
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
            const { status, headers } = await this.axiosClient.post(url, {
                headers: {
                    'Authorization': getAPIKey()
                },
                data: cardholder
            })

            if (status != HttpCode.CREATED) {
                throw AppError.internalServer(`fail to create cardholder as http code is not ${HttpCode.CREATED}`)
            }

            if (headers instanceof AxiosHeaders) {
                return {
                    cardholderId: this.extractIdFromURL(headers['Location']),
                    href: headers['Location']
                }
            } else {
                Logger.error('No cardholder href return');
                throw AppError.internalServer('No cardholder href return')
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                throw AppError.internalServer(`${error.code}: ${error.message}`)
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
    async update(cardholderId: string, requstBody: GallagherUpdateCardholderRequest): Promise<boolean> {
        const url = `${this.endpointConfig.endpoint}/${cardholderId}`
        try {
            const { status } = await this.axiosClient.patch(url, {
                headers: {
                    'Authorization': getAPIKey()
                },
                data: requstBody
            })

            if (status != HttpCode.NO_CONTENT) {
                Logger.error('Deleting the cardholder failed');
                throw AppError.internalServer('Deleting the cardholder failed')
            }

            return true
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                throw AppError.internalServer(`${error.code}: ${error.message}`)
            }

            throw AppError.internalServerWrap(error)
        }
    }

    /**
     * Remove cardholder:
     * https://gallaghersecurity.github.io/cc-rest-docs/ref/cardholders.html#/definitions/Cardholder%20PATCH%20example
     * 
     * @param id 
     * @param requestBody
     * @returns 
     */
    async remove(cardholderId: string): Promise<boolean> {
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

            return true
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return Promise.reject(AppError.internalServer(`${error.code}: ${error.message}`))
            }
            return Promise.reject(AppError.internalServerWrap(error))
        }
    }

    /**
     * Add card to cardholder:
     * 
     * @param id 
     * @param requestBody
     * @returns 
     */
    async addCard2Cardholder(cardholderId: string, gallagherUpdateReq: GallagherUpdateCardholderRequest): Promise<boolean> {
        return await this.update(cardholderId, gallagherUpdateReq)
    }

    /**
     * Remove card from a cardholder: 
     * https://gallaghersecurity.github.io/cc-rest-docs/ref/cardholders.html#/definitions/Cardholder%20PATCH%20example
     * 
     * @param id 
     * @returns 
     */
    async removeCardFromCardholder(cardholderId: string, cardId: string): Promise<boolean> {
        const url = `${this.endpointConfig.endpoint}/${cardholderId}/cards${cardId}`
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

            return true
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return Promise.reject(AppError.internalServer(`${error.code}: ${error.message}`))
            }
            return Promise.reject(AppError.internalServerWrap(error))
        }
    }

    private extractIdFromURL(url: string) {
        const urlPieces = url.split('/')
        return urlPieces[urlPieces.length - 1]
    }
}

const CardholderAPI = new Cardhodlers()
export default CardholderAPI