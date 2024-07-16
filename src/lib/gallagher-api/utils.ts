import { envs } from "../../config/env"
import { AppError } from "../../errors/custom.error"

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