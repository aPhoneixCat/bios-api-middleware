import axios from "axios";
import { envs } from "../config/env";

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
const getAuthorizationHeaders = (apiKey: string) => { return `GGL-API-KEY ${apiKey}` }

/**
 * A configuration for an API endpoint
 */
export interface EndpointConfig {
    endpoint: string,
    dto_list?: any, // DTO to be used for list requests
    dto_retrieve?: any, // DTO to be used for retrieve requests
    top?: number, // Number of response to return
    sort?: string, // Can be set to id or -id
    fields?: string[] // Optional list of fields to return
}

/**
 * Base API endpoint class for gallagher APIs
 */
export interface IAPIEndpoint {

    /**
     * Return the configuration of this endpoint object
     */
    get_config(): EndpointConfig

    list(skip: number): any
    get(id: string): any
    update(): void
    create(): void
    delete(): void
    

}