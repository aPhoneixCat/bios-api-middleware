import { Get, Post, Body, Path, Route, Tags } from "tsoa";
import { RegisterRequest, RegisterResponse, AccessRequest, RefresAccessRequest, AccessResponse, ActivationResponse, DynamicQRCodeLinkResponse } from "../../domain/dtos/qrcode";
import { QRCodeType } from "../../domain/entities/qrcode";

@Route("qrcode")
@Tags("QRCode")
export class QRCodeController {
  //* Dependency injection
  constructor() { }

  @Post("/register_qrcode")
  public async registerVisit(@Body() registerRequest: RegisterRequest): Promise<RegisterResponse> {
    const mockDataURL = [
      'data:image/png;base64,',
      'iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAABmJLR0QA/wD/AP+gvaeTAA',
      'AC20lEQVR4nO3dQY7jMAwEwM1i///lzGUurYtWEEknQNV1EidjNGhFpuTX+/1+/4Fff5/+',
      'AnwWgSAIBEEgCAJBEAiCQBAEgiAQBIEgCARBIAgCQRAIgkAQ/t0e4PV6VXyP/7a2b6yff9',
      'vecXq83eufPj+nVAiCQBAEgnA9hlhVt2jursGn1/hbt2OW6fNzSoUgCARBIAjlY4jV6TWu',
      'ex7hdt7g6TFA9zIaFYIgEASBILSPIbrdjhlWt/civn2prApBEAiCQBC+fgzR3R8xfa/kaS',
      'oEQSAIAkFoH0N82u/y03sVuzFJ9xhlmgpBEAiCQBDKxxDTv8u7+x9uP3/3+k+jQhAEgiAQ',
      'hOsxxNO/o0/7G07/fuvp83NKhSAIBEEgCK/u52VUzwNUr6Ponkc4Pb3V+1OcUiEIAkEQCE',
      'L5HlPT17zuPZ1ux0Dde2BVUyEIAkEQCEL5vYzTa271NfF2nUb1vMj097mlQhAEgiAQhPG1',
      'nbf3IqbnBXZjnuq9sKfncVYqBEEgCAJBGL+XsTqdp6g+/qr7Gr2q/n/0Q1BKIAgCQSjvqa',
      'z+3b07/qq6h3G6Z3P3/h1jCEoJBEEgCO3zEJ/ej3Cq+hlb3etSTqkQBIEgCATh4+YhqucF',
      'nu5fmD7+LRWCIBAEgSA83g+xmu45nH4m1+3nd1MhCAJBEAhC+x5T3br7I05193d0P5tchS',
      'AIBEEgCOXzEN1un3lV/Qyt6nUe3f0OOyoEQSAIAkEo3x+ielrj9Bq96h5z7Dx9b+eUCkEQ',
      'CIJAENr3mJpemzjdU7l7/7dRIQgCQRAIwvg+ldWm13Wc6t4Hs5oKQRAIgkAQvn4MUb1WdP',
      'q5nKevt08lowSCIBCE9jHE9F7R0/MGu7/f9lDqh+BRAkEQCML12s6n12Wcqp5n6N5X8/Tz',
      'zENQSiAIAkH4+v0hqKVCEASCIBAEgSAIBEEgCAJBEAiCQBAEgiAQBIEgCARBIAgCQfgBlZ',
      '7HAm5AupgAAAAASUVORK5CYII='].join('')
    return {
      qrcode: mockDataURL + registerRequest.visitId,
      qrcodeType: QRCodeType.DATA_URL
    }
  }

  // Create new access qr code, it will create cardholder and card
  @Post("/access_qrcode")
  public async getAccessQRCode(@Body() accessRequest: AccessRequest): Promise<AccessResponse> {
    const mockDataURL = [
      'data:image/png;base64,',
      'iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAABmJLR0QA/wD/AP+gvaeTAA',
      'AC20lEQVR4nO3dQY7jMAwEwM1i///lzGUurYtWEEknQNV1EidjNGhFpuTX+/1+/4Fff5/+',
      'AnwWgSAIBEEgCAJBEAiCQBAEgiAQBIEgCARBIAgCQRAIgkAQ/t0e4PV6VXyP/7a2b6yff9',
      'vecXq83eufPj+nVAiCQBAEgnA9hlhVt2jursGn1/hbt2OW6fNzSoUgCARBIAjlY4jV6TWu',
      'ex7hdt7g6TFA9zIaFYIgEASBILSPIbrdjhlWt/civn2prApBEAiCQBC+fgzR3R8xfa/kaS',
      'oEQSAIAkFoH0N82u/y03sVuzFJ9xhlmgpBEAiCQBDKxxDTv8u7+x9uP3/3+k+jQhAEgiAQ',
      'hOsxxNO/o0/7G07/fuvp83NKhSAIBEEgCK/u52VUzwNUr6Ponkc4Pb3V+1OcUiEIAkEQCE',
      'L5HlPT17zuPZ1ux0Dde2BVUyEIAkEQCEL5vYzTa271NfF2nUb1vMj097mlQhAEgiAQhPG1',
      'nbf3IqbnBXZjnuq9sKfncVYqBEEgCAJBGL+XsTqdp6g+/qr7Gr2q/n/0Q1BKIAgCQSjvqa',
      'z+3b07/qq6h3G6Z3P3/h1jCEoJBEEgCO3zEJ/ej3Cq+hlb3etSTqkQBIEgCATh4+YhqucF',
      'nu5fmD7+LRWCIBAEgSA83g+xmu45nH4m1+3nd1MhCAJBEAhC+x5T3br7I05193d0P5tchS',
      'AIBEEgCOXzEN1un3lV/Qyt6nUe3f0OOyoEQSAIAkEo3x+ielrj9Bq96h5z7Dx9b+eUCkEQ',
      'CIJAENr3mJpemzjdU7l7/7dRIQgCQRAIwvg+ldWm13Wc6t4Hs5oKQRAIgkAQvn4MUb1WdP',
      'q5nKevt08lowSCIBCE9jHE9F7R0/MGu7/f9lDqh+BRAkEQCML12s6n12Wcqp5n6N5X8/Tz',
      'zENQSiAIAkH4+v0hqKVCEASCIBAEgSAIBEEgCAJBEAiCQBAEgiAQBIEgCARBIAgCQfgBlZ',
      '7HAm5AupgAAAAASUVORK5CYII='].join('')
    return {
      qrcode: mockDataURL + accessRequest.visitId,
      qrcodeType: QRCodeType.DATA_URL
    }
  }

  // Replace old card and create new card for same cardholder.
  @Post("/refresh_access_qrcode")
  public async refreshAccessQRCode(@Body() refreshAccessRequest: RefresAccessRequest): Promise<AccessResponse> {
    const mockDataURL = [
      'data:image/png;base64,',
      'iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAABmJLR0QA/wD/AP+gvaeTAA',
      'AC20lEQVR4nO3dQY7jMAwEwM1i///lzGUurYtWEEknQNV1EidjNGhFpuTX+/1+/4Fff5/+',
      'AnwWgSAIBEEgCAJBEAiCQBAEgiAQBIEgCARBIAgCQRAIgkAQ/t0e4PV6VXyP/7a2b6yff9',
      'vecXq83eufPj+nVAiCQBAEgnA9hlhVt2jursGn1/hbt2OW6fNzSoUgCARBIAjlY4jV6TWu',
      'ex7hdt7g6TFA9zIaFYIgEASBILSPIbrdjhlWt/civn2prApBEAiCQBC+fgzR3R8xfa/kaS',
      'oEQSAIAkFoH0N82u/y03sVuzFJ9xhlmgpBEAiCQBDKxxDTv8u7+x9uP3/3+k+jQhAEgiAQ',
      'hOsxxNO/o0/7G07/fuvp83NKhSAIBEEgCK/u52VUzwNUr6Ponkc4Pb3V+1OcUiEIAkEQCE',
      'L5HlPT17zuPZ1ux0Dde2BVUyEIAkEQCEL5vYzTa271NfF2nUb1vMj097mlQhAEgiAQhPG1',
      'nbf3IqbnBXZjnuq9sKfncVYqBEEgCAJBGL+XsTqdp6g+/qr7Gr2q/n/0Q1BKIAgCQSjvqa',
      'z+3b07/qq6h3G6Z3P3/h1jCEoJBEEgCO3zEJ/ej3Cq+hlb3etSTqkQBIEgCATh4+YhqucF',
      'nu5fmD7+LRWCIBAEgSA83g+xmu45nH4m1+3nd1MhCAJBEAhC+x5T3br7I05193d0P5tchS',
      'AIBEEgCOXzEN1un3lV/Qyt6nUe3f0OOyoEQSAIAkEo3x+ielrj9Bq96h5z7Dx9b+eUCkEQ',
      'CIJAENr3mJpemzjdU7l7/7dRIQgCQRAIwvg+ldWm13Wc6t4Hs5oKQRAIgkAQvn4MUb1WdP',
      'q5nKevt08lowSCIBCE9jHE9F7R0/MGu7/f9lDqh+BRAkEQCML12s6n12Wcqp5n6N5X8/Tz',
      'zENQSiAIAkH4+v0hqKVCEASCIBAEgSAIBEEgCAJBEAiCQBAEgiAQBIEgCARBIAgCQfgBlZ',
      '7HAm5AupgAAAAASUVORK5CYII='].join('')
    return {
      qrcode: mockDataURL + refreshAccessRequest.visitId,
      qrcodeType: QRCodeType.DATA_URL
    }
  }

  @Get("/{visitId}/dynamic_link")
  public async getDynamicQRCodeLink(@Path() visitId: string): Promise<DynamicQRCodeLinkResponse> {
    const dynamic_link = 'http://xxxx:xxx'
    return {
      dynamicQRCodeLink: dynamic_link + visitId
    }
  }

  // Activate dynamic QR code link
  @Get("/dynamic_link/{visitId}/activate")
  public async activate(@Path() visitId: string): Promise<ActivationResponse> {
    const goodRes: ActivationResponse = {
      success: true
    }

    const badRes: ActivationResponse = {
      success: false,
      reason: 'xxxx' + visitId
    }

    return goodRes
  }

}