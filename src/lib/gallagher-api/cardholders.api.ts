import axios from "axios"
import { envs } from "../../config/env"
import { HttpCode } from "../../constants"
import { CardholderDetail } from "../../domain/dtos/gallagher/detail"
import { IAPIEndpoint, EndpointConfig, getAPIKey } from "./api-endpoint"
import Logger from "../logger"

const axiosClient = axios.create({
    baseURL: envs.GALLAGHER_API_URL
})

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
            const { data } = await axiosClient.get<CardholderDetail>(url, {
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
    async create(cardholder: CardholderDetail): Promise<boolean> {
        const url = `${this.endpointConfig.endpoint}`
        try {
            const { data, status } = await axiosClient.post(url, {
                headers: {
                    'Authorization': getAPIKey()
                },
                data: cardholder
            })

            if (status != HttpCode.CREATED) {
                Logger.error('error message: ', `http code is not 201`);
                throw Error('fail to create cardholder')
            } 

            return true
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
     * Enable/disable cardholder:
     * https://gallaghersecurity.github.io/cc-rest-docs/ref/cardholders.html#/definitions/Cardholder%20PATCH%20example
     * 
     * @param id 
     * @param authorised true - disable; false - enable
     * @returns 
     */
    async authorise(id: string, authorised: boolean): Promise<boolean> {
        const url = `${this.endpointConfig.endpoint}/${id}`
        try {
            const { data, status } = await axiosClient.patch(url, {
                headers: {
                    'Authorization': getAPIKey()
                }
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

    async refreshCard(cardholderId: string, cardId: string) {
        
    }

}