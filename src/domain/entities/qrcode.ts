export enum QRCodeType {
    DATA_URL = 'data_url',
    DYNAMIC_LINK = 'dynamic_link'
}

interface QRCode {
    qrcode: string,
    qrCodeType: QRCodeType,
    RelatedInfo?: Record<string, string>
}

export class RegisterQRCode implements QRCode {
    qrCodeType: QRCodeType = QRCodeType.DATA_URL

    constructor (public qrcode: string) {
        this.qrcode = qrcode
    }
    
}

export class DynamicQRCodeLink implements QRCode {
    qrCodeType: QRCodeType = QRCodeType.DYNAMIC_LINK

    constructor (public qrcode: string) {
        this.qrcode = qrcode
    }
}

export class AccessQRCode implements QRCode {
    qrCodeType: QRCodeType = QRCodeType.DATA_URL

    constructor (public qrcode: string) {
        this.qrcode = qrcode
    }
}

