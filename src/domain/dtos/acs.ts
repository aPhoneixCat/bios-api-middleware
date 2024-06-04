//TODO

import { UserType } from "../entities/cardholder"
import { CardholderDetail } from "./gallagher/cardholder"
import { BasedResponse, HrefMixin, IdentityMixin } from "./utils"

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

export interface UpdateCardholderRequest {}
export interface UpdateCardholderResponse extends BasedResponse {}

export interface AddCardToCardholderRequest {
    cardNumber: string,
    fromInMs?: number,
    validityPeriodInMs?: number
}

