export interface LoginRequest {
    username: string,
    password: string
}

export interface LoginResponse {
    controllerVersion: string,
    serviceTicket: string
}