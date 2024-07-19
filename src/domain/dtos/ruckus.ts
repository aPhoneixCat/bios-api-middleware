import { PassEffectSince, PassValidFor } from "./ruckus/guestpass"

export interface GenerateGuestPassRequest {
    guestName: string,
    numberOfPasses: number,
    passValidFor: PassValidFor,
    passEffectSince: PassEffectSince,
    maxDevices: number
}

export interface GenerateGuestPassResponse {
    ssid: string,
    key: string,
    expirationDate: string
}