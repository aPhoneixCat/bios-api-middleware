import axios from "axios";
import { envs } from "../../config/env";
import { CardholderDetail } from "../../domain/dtos/gallagher/detail";
import Logger from "../logger";
import { HttpCode } from "../../constants";
import { AppError } from "../../errors/custom.error";

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
    fields?: string[] // Optional list of fields to return
}

/**
 * Base API endpoint class for gallagher APIs
 */
export abstract class IAPIEndpoint {

    /**
     * The configuration of this endpoint object
     */
    endpointConfig: EndpointConfig

    constructor(config: EndpointConfig) {
        this.endpointConfig = config
    }

    abstract getConfig(): EndpointConfig

    abstract get(id: string): any

    // list(skip: number): any

    // update(): void
    // create(): void
    // delete(): void


}