import { IAPIEndpoint, EndpointConfig } from "../api-endpoint"
import { envs } from "../../config/env"
import { GuestPassGenerateRequest, GuestPassGenerateResponse, GuestPassListParameters, GuestPassListResponse } from "../../domain/dtos/ruckus/guestpass"
import { AxiosError } from "axios"
import RuckusLoginAPI from "./ruckus-login.api"

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

    async generateGuestPass(serviceTicket: string): Promise<GuestPassGenerateResponse> {
        const url = `${this.endpointConfig.endpoint}/generate?serviceTicket=${this.getServiceTicket()}`
        const request: GuestPassGenerateRequest | undefined = undefined
        this.axiosClient.post(url, request, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })

        // todo if serviceTicket is expired, need to re-generate

        return {}
    }

    async listGuestPass(parameters: GuestPassListParameters): Promise<GuestPassListResponse> {
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