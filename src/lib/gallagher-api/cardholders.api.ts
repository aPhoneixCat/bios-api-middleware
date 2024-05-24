import axios, { AxiosHeaders } from "axios"
import { HttpCode } from "../../constants"
import { IAPIEndpoint, EndpointConfig, getAPIKey } from "./api-endpoint"
import Logger from "../logger"
import { CreateCardholderRequest, CreateCardholderResponse, GetCardholderDetailResponse, UpdateCardholderRequest } from "../../domain/dtos/gallagher/cardholder"

export class Cardhodlers extends IAPIEndpoint {

    getConfig(): EndpointConfig {
        return {
            endpoint: '/api/cardholders',
            fields: ['defaults']
        }
    }

    /**
     * Get detail of a cardholder
     * 
     * @param id cardholder id
     * @returns 
     */
    async get(id: string): Promise<any> {
        const url = `${this.endpointConfig.endpoint}/${id}`
        try {
            const { data } = await this.axiosClient.get<GetCardholderDetailResponse>(url, {
                headers: {
                    'Authorization': getAPIKey()
                }
            })

            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                Logger.error('error message: ', error.message);
            } else {
                Logger.error('unexpected error: ', error);
            }

            throw error
        }
    }

    /**
     * Create a new cardholder
     * 
     * @param cardholder 
     * @returns 
     */
    async create(cardholder: CreateCardholderRequest): Promise<CreateCardholderResponse> {
        const url = `${this.endpointConfig.endpoint}`
        try {
            const { status, headers } = await this.axiosClient.post(url, {
                headers: {
                    'Authorization': getAPIKey()
                },
                data: cardholder
            })

            if (status != HttpCode.CREATED) {
                Logger.error('error message: ', `http code is not ${HttpCode.CREATED}`);
                throw Error('fail to create cardholder')
            }

            if (headers instanceof AxiosHeaders) {
                return {
                    cardholderId: this.extractIdFromURL(headers['Location']),
                    href: headers['Location']
                }
            } else {
                Logger.error('No cardholder href return');
                throw Error('No cardholder href return')
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                Logger.error('error message: ', error.message);
            }

            Logger.error('unexpected error: ', error);
            throw error
        }
    }

    /**
     * Enable/disable cardholder:
     * https://gallaghersecurity.github.io/cc-rest-docs/ref/cardholders.html#/definitions/Cardholder%20PATCH%20example
     * 
     * @param id 
     * @param requestBody
     * @returns 
     */
    async update(id: string, requstBody: UpdateCardholderRequest): Promise<boolean> {
        const url = `${this.endpointConfig.endpoint}/${id}`
        try {
            const { data, status } = await this.axiosClient.patch(url, {
                headers: {
                    'Authorization': getAPIKey()
                },
                data: requstBody
            })

            if (status != HttpCode.OK && status != HttpCode.NO_CONTENT) {
                Logger.error('error message: ', `http code is not 201`);
                throw Error('fail to create cardholder')
            } 

            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                Logger.error('error message: ', error.message);
            } else {
                Logger.error('unexpected error: ', error);
            }

            throw error
        }
    }

    extractIdFromURL(url: string) {
        const urlPieces = url.split('/')
        return urlPieces[urlPieces.length - 1]
    }
}