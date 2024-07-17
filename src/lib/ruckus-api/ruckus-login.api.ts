import axios, { AxiosError, AxiosHeaders } from "axios"
import { IAPIEndpoint, EndpointConfig } from "../api-endpoint"
import { AppError } from "../../errors/custom.error"
import { envs } from "../../config/env"
import { LoginRequest, LoginResponse } from "../../domain/dtos/ruckus/login"

interface RuckusErrorMsgRes {
    message: string
}

export class RuckusLogin extends IAPIEndpoint {


    protected getConfig(): EndpointConfig {
        return {
            endpoint: '/v12_0/serviceTicket',
            timeoutInMs: 5000
        }
    }

    /**
     * Login and get service ticket
     * 
     * @param id cardholder id
     * @returns 
     */
    async login(): Promise<LoginResponse> {
        const url = `${envs.RUCKUS_API_URL}/${this.endpointConfig.endpoint}`
        const loginRequest: LoginRequest = {
            username: envs.RUCKUS_USERNAME,
            password: envs.RUCKUS_PASSWORD
        }
        try {
            const { data } = await this.axiosClient.post<LoginResponse>(url, loginRequest)

            return data
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                throw AppError.internalServer(this.buildErrorMessage(error))
            }
            throw AppError.internalServerWrap(error)
        }
    }

    private buildErrorMessage(error: AxiosError) {
        const { response } = error;
        let errMsg;
        if (response) {
            errMsg = `${response.statusText}: ${JSON.stringify((response.data as RuckusErrorMsgRes).message)}`
        } else {
            errMsg = `${error.status || error.code}: ${error.message}`
        } 
    
        return errMsg;
    }
}

const RuckusLoginAPI = new RuckusLogin(envs.RUCKUS_API_URL)
export default RuckusLoginAPI