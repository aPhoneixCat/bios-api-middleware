import { IAPIEndpoint, EndpointConfig } from "../api-endpoint"
import { envs } from "../../config/env"
import { RuckusGuestPassGenerateRequest, RuckusGuestPassGenerateResponse, RuckusGuestPassListParameters, RuckusGuestPassListResponse } from "../../domain/dtos/ruckus/guestpass"
import axios, { AxiosError } from "axios"
import RuckusLoginAPI from "./ruckus-login.api"
import { AppError } from "../../errors/custom.error"

interface RuckusErrorMsgRes {
    message: string
}

export class RuckusGuestPass extends IAPIEndpoint {

    private serviceTicket: string | undefined;

    protected getConfig(): EndpointConfig {
        return {
            endpoint: '/v12_0/identity/guestpass',
            timeoutInMs: 5000
        }
    }

    private async getServiceTicket() {
        if (!this.serviceTicket) {
            const res = await RuckusLoginAPI.login()
            this.serviceTicket = res.serviceTicket
        }

        return this.serviceTicket
    }

    async generateGuestPass(): Promise<RuckusGuestPassGenerateResponse> {
        const url = `${this.endpointConfig.endpoint}/generate?serviceTicket=${this.getServiceTicket()}`
        const request: RuckusGuestPassGenerateRequest | undefined = undefined

        try {
            const { data } =  await this.axiosClient.post(url, request, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })

            return data
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                throw AppError.internalServer(this.buildErrorMessage(error))
            }
            throw AppError.internalServerWrap(error)
        }
        

        // todo if serviceTicket is expired, need to re-generate

        return {}
    }

    async listGuestPass(parameters: RuckusGuestPassListParameters): Promise<RuckusGuestPassListResponse> {
        const url = `${this.endpointConfig.endpoint}?serviceTicket=${this.getServiceTicket()}`
        this.axiosClient.get(url, {
            params: parameters,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })

        // todo if serviceTicket is expired, need to re-generate

        return {}
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

const RuckusGuestPassAPI = new RuckusGuestPass(envs.RUCKUS_API_URL)
export default RuckusGuestPassAPI