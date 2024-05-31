import axios, { AxiosError } from "axios";
import axiosRetry from "axios-retry"
import { envs } from "../../config/env";
import { AxiosInstance } from "axios";
import Logger from "../logger";
import { AppError } from "../../errors/custom.error";

/**
 * Validate Grallagher API kjey
 * 
 * 1. If key is in the rigt format
 * @param api_key Gallagher API 
 * @returns 
 */
const checKAPIKey = (apiKey: string) => {
    const tokens = apiKey.split('-')
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

    throw AppError.unauthorized('The gallagher api key is invalid')
}

/**
 * A configuration for an API endpoint
 */
export interface EndpointConfig {
    endpoint: string,
    timeoutInMs?: number,
    countofRetry?: number,
    intervalOfRetryInMs?: number,

    fields?: string[], // Optional list of fields to return
}

/**
 * Base API endpoint class for gallagher APIs
 */
export abstract class IAPIEndpoint {

    /**
     * The configuration of this endpoint object
     */
    protected endpointConfig: EndpointConfig
    protected axiosClient: AxiosInstance

    constructor() {
        this.endpointConfig = this.getConfig()
        this.axiosClient = axios.create({
            baseURL: envs.GALLAGHER_API_URL,
            timeout: this.endpointConfig.timeoutInMs || 2000
        })
        this.initalRetry(this.axiosClient)
    }

    private initalRetry(axiosClient: AxiosInstance) {
        const retryCnt = this.endpointConfig.countofRetry || 3
        const retryInterval = this.endpointConfig.intervalOfRetryInMs || 1000
        axiosRetry(axiosClient, {
            retries: this.endpointConfig.countofRetry, // number of retries
            retryDelay: (retryCount: number) => {
                Logger.warning(`retry attempt: ${retryCount}`);
                return retryCnt * retryInterval; // time interval between retries
            },
            retryCondition: (error: AxiosError) => {
                const errorRes = error.response
                if (errorRes) {
                    return [500, 503].includes(errorRes.status);
                }

                return false
            },
        });
    }

    protected abstract getConfig(): EndpointConfig
}