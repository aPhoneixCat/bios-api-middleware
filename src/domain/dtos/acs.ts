//TODO

import { UserType } from "../entities/cardholder"

// Cardholder APIs
// router.post('/cardholders', ctl.createCardholder)
export interface CreateCardholderRequest {
    userName: string,
    userType: UserType,
    cardNumber: string,
    validityPeriodInMs: number
}

export interface CreateCardholderResponse {
    cardholderId: string,
    expiredAt: number
}

// router.patch('/cardholers/{cardholderId}', ctl.updateCardholder)
// router.delete('/cardholders/{carholderId}', ctl.removeCardholder)
// router.post('/cardholders/{carholderId}/cards', ctl.addCard2Cardholder)
// router.delete('/cardholders/{carholderId}/cards/{cardId}', ctl.removeCardFromCardholder)
// router.get('/cardholders/{carholderId}/', ctl.activateCardholder)
