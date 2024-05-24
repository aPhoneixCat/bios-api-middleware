import axios from "axios"
import { IAPIEndpoint, EndpointConfig, getAPIKey } from "./api-endpoint"
import Logger from "../logger"
import { EventDetailResponse, EventSearchResponse, EventTypeListResponse } from "../../domain/dtos/gallagher/event"

export class Events extends IAPIEndpoint {

    getConfig(): EndpointConfig {
        return {
            endpoint: '/api/events',
            fields: ['defaults']
        }
    }

    /**
     * Get event detail
     * 
     * @param id event id
     * @returns EventSearchResponse
     */
    async get(id: string): Promise<EventDetailResponse> {
        const url = `${this.endpointConfig.endpoint}/${id}`
        try {
            const { data } = await this.axiosClient.get<EventDetailResponse>(url, {
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
     * Search events
     * 
     * @param id cardholder id
     * @returns EventSearchResponse
     */
    async search(params: any): Promise<EventSearchResponse> {
        const url = `${this.endpointConfig.endpoint}`
        try {
            const { data } = await this.axiosClient.get<EventSearchResponse>(url, {
                headers: {
                    'Authorization': getAPIKey()
                },
                params: params
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
     * Get new events
     * 
     * Poll this link to receive new events that match the specified filters. 
     * If there are none ready, the call will block until one arrives or a deadline passes.
     * For its correct use in various scenarios, see the use cases. 
     * In particular, sleep between calls to reduce load on the server.
     * 
     * @param params 
     * @returns EventSearchResponse
     */
    async getNewEvents(params: any): Promise<EventSearchResponse> {
        const url = `${this.endpointConfig.endpoint}/updates`
        try {
            const { data } = await this.axiosClient.get<EventSearchResponse>(url, {
                headers: {
                    'Authorization': getAPIKey()
                },
                params: params
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
     * List all event groups and types
     * 
     * @returns EventTypeListResponse
     */
    async listEventTypes(): Promise<EventTypeListResponse>  {
        const url = `${this.endpointConfig.endpoint}/groups`
        try {
            const { data } = await this.axiosClient.get<EventTypeListResponse>(url, {
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

}