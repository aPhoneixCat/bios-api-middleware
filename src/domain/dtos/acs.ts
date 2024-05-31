//TODO

import { UserType } from "../entities/cardholder"
import { CardholderDetail } from "./gallagher/cardholder"
import { HrefMixin, IdentityMixin } from "./utils"

export interface BasedResponse {
    success: boolean
}

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
export interface UpdateCardholderRequest {

}

// todo
export interface UpdateCardholderResponse extends BasedResponse {}

export interface AddCardToCardholderRequest {
    cardNumber: string,
    fromInMs?: number,
    validityPeriodInMs?: number
}

// router.patch('/cardholers/{cardholderId}', ctl.updateCardholder)
// router.delete('/cardholders/{carholderId}', ctl.removeCardholder)
// router.post('/cardholders/{carholderId}/cards', ctl.addCard2Cardholder)
// router.delete('/cardholders/{carholderId}/cards/{cardId}', ctl.removeCardFromCardholder)
// router.get('/cardholders/{carholderId}/', ctl.activateCardholder)

