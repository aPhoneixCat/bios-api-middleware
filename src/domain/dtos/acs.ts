//TODO

import { UserType } from "../entities/cardholder"
import { CardholderDetail } from "./gallagher/cardholder"
import { HrefMixin, IdentityMixin } from "./utils"

export type GetCardholderResponse = CardholderDetail & IdentityMixin & HrefMixin

export interface CreateCardholderRequest {
    userName: string,
    userType: UserType,
    authorised?: boolean,
    card2Add?: AddCardToCardholderRequest
}

export interface CreateCardholderResponse {
    cardholderId: string,
    card?: {
        cardId: string,
        expiredAt: number
    }
}

// todo
export interface UpdateCardholderRequest {}
// todo
export interface UpdateCardholderResponse {}

export interface AddCardToCardholderRequest {
    cardNumber: string,
    fromInMs?: number,
    validityPeriodInMs?: number
}

