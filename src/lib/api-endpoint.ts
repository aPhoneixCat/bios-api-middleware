import axios, { AxiosError } from "axios";
import { AxiosInstance } from "axios";
import axiosRetry from "axios-retry"
import https from "https"
import Logger from "./logger";
import { HttpCode } from "../constants";

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

    constructor(baseURL: string | undefined) {
        this.endpointConfig = this.getConfig()
        this.axiosClient = axios.create({
            baseURL: baseURL,
            timeout: this.endpointConfig.timeoutInMs || 2000,
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        })
        this.initialInterceptors(this.axiosClient)
        this.initialRetry(this.axiosClient)
    }

    private initialInterceptors(axiosClient: AxiosInstance) {
        axiosClient.interceptors.request.use(req => {
            const printable = `Request: ${req.method?.toUpperCase()} | ${req.url} | ${JSON.stringify(req.headers)} | ${JSON.stringify(req.data)}`
            Logger.info(printable)

            return req
        })

        axiosClient.interceptors.response.use(
            (res) => {
                Logger.info(`Response: ${res.status} | ${JSON.stringify(res.headers)} | ${JSON.stringify(res.data)}`)

                return res
            },
            (error: AxiosError) => {
                if (!error.config) {
                    return Promise.reject(error)
                }
            
                const {config: { method, url }, response } = error;
                if (response) {
                    Logger.error(`Failed to call [${method?.toUpperCase()} ${url}] as ${response.statusText}: ${JSON.stringify(response.data)}, Cause: ${error.stack}`)
                } else {
                    Logger.error(`Failed to call [${method?.toUpperCase()} ${url}] as ${error.status || error.code}: ${error.message}, Cause: ${error.stack}`)
                }                

                return Promise.reject(error)
            }
        )
    }

    private initialRetry(axiosClient: AxiosInstance) {
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
                    return [
                        HttpCode.INTERNAL_SERVER_ERROR, 
                        HttpCode.SERVICE_UNAVAILABLE
                    ].includes(errorRes.status);
                }

                return false
            },
        });
    }

    protected abstract getConfig(): EndpointConfig
}
