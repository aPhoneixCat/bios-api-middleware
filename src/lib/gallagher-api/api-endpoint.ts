import axios from "axios";
import axiosRetry from "axios-retry"
import { envs } from "../../config/env";
import { AxiosInstance } from "axios";
import Logger from "../logger";

/**
 * Validate Grallagher API kjey
 * 
 * 1. If key is in the rigt format
 * @param api_key Gallagher API 
 * @returns 
 */
const checKAPIKey = (api_key: string) => {
    const tokens = api_key.split('-')
    return tokens.length == 8
}

/**
 * Creates an authorization header for Gallagher API calls.
 * The server expects an Authorization header with GGL-API-KEY set to the API key provided by Gallagher Command Centre.
 */
export const getAPIKey = () => {
    const apiKey: string = envs.GALLAGHER_API_KEY
    if (checKAPIKey(apiKey)) {
        return `GGL-API-KEY ${apiKey}`
    }

    throw new Error('The gallagher api key is invalid')
}

/**
 * A configuration for an API endpoint
 */
export interface EndpointConfig {
    endpoint: string,
    dto_list?: any, // DTO to be used for list requests
    dto_get?: any, // DTO to be used for retrieve requests
    top?: number, // Number of response to return
    sort?: string, // Can be set to id or -id
    fields?: string[], // Optional list of fields to return

    countofRetry?: number,
    intervalOfRetryInMs?: number
}

/**
 * Base API endpoint class for gallagher APIs
 */
export abstract class IAPIEndpoint {

    /**
     * The configuration of this endpoint object
     */
    endpointConfig: EndpointConfig
    axiosClient: AxiosInstance

    constructor(config: EndpointConfig) {
        this.endpointConfig = config
        this.axiosClient = axios.create({
            baseURL: envs.GALLAGHER_API_URL
        })
        this.initalRetry(this.axiosClient)
    }

    initalRetry(axiosClient: AxiosInstance) {
        const retryCnt = this.endpointConfig.countofRetry || 3
        const retryInterval = this.endpointConfig.intervalOfRetryInMs || 1000
        axiosRetry(axiosClient, {
            retries: this.endpointConfig.countofRetry, // number of retries
            retryDelay: (retryCount) => {
                Logger.warning(`retry attempt: ${retryCount}`);
                return retryCnt * retryInterval; // time interval between retries
            },
            retryCondition: (error) => {
                const errorRes = error.response
                if (errorRes) {
                    return [500, 503].includes(errorRes.status);
                }

                return false
            },
        });
    }

    abstract getConfig(): EndpointConfig
}