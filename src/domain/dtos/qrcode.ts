import { QRCodeType } from "../entities/qrcode"

export interface RegisterRequest {
    visitId: string
}

export interface RegisterResponse {
    qrcode: string,
    qrcodeType: QRCodeType
}

export interface AccessRequest {
    visitId: string
}

export interface RefresAccessRequest {
    visitId: string,
    cardholderId: string,
    existingCardId: string
}

export interface AccessResponse {
    qrcode: string,
    qrcodeType: QRCodeType
}

export interface DynamicQRCodeLinkResponse {
    dynamicQRCodeLink: string,
}

export interface ActivationResponse {
    success: boolean,
    reason?: string
}