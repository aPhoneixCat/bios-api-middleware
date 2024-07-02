//TODO

import { Floor } from "../../config/floors"
import { UserType } from "../entities/cardholder"
import { CardholderDetail } from "./gallagher/cardholder"
import { HrefMixin, IdentityMixin } from "./utils"

export type GetCardholderResponse = CardholderDetail & IdentityMixin & HrefMixin

export interface CreateCardholderRequest {
    userName: string,
    userType: UserType,
    authorised?: boolean,
    card2Add?: AddCardToCardholderRequest,
    floor?: Floor
}

export interface CreateCardholderResponse {
    cardholderId: string,
    card?: {
        cardId: string,
        expiredAt: number
    }
}

// Refresh cards of cardholder
export interface RefreshCardholderCardRequest {
    existingCardId: string,
    card2Add: AddCardToCardholderRequest
}
export interface RefreshCardholderCardResponse {
    cardholderId: string,
    newCard: {
        cardId: string,
        expiredAt: number
    }
}

export interface AddNewCardResponse {
    newCardId: string
}

// todo
export interface UpdateCardholderResponse {}

export interface AddCardToCardholderRequest {
    cardNumber: string,
    fromInMs?: number,
    validityPeriodInMs?: number
}

