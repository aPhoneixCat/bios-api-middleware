export enum EventType {
    Cardholder_CheckinCheckout = 'Cardholder_CheckinCheckout'
}

export enum Actitity {
    Checkin = 'Checkin',
    Checkout = 'Checkout'
}

export interface Event {
    timestamp: number
    type: EventType,
    message: string
}

export interface CardholderCheckinoutEvent extends Event {
    cardholderId: string
    activity: Actitity
}

