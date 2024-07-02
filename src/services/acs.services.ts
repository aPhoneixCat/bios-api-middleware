import { envs } from "../config/env";
import { AddNewCardResponse, CreateCardholderResponse, GetCardholderResponse, RefreshCardholderCardRequest, RefreshCardholderCardResponse, UpdateCardholderResponse } from "../domain/dtos/acs";
import { Card, GallagherGetCardholderDetailResponse, GallagherUpdateCardholderRequest } from "../domain/dtos/gallagher/cardholder";
import { CardEntity, CardholderEntity } from "../domain/entities/cardholder";
import { AppError } from "../errors/custom.error";
import CardholderAPI from "../lib/gallagher-api/cardholders.api";
import Logger from "../lib/logger";
import { provideSingleton } from "../utils/provideSingleton";

@provideSingleton(ACSService)
export default class ACSService {
  
    /**
     * Get cardholder 
     * 
     * @param cardholerId cardholderId to identify cardholder
     * @returns 
     */
    public async getCardholder(cardholerId: string): Promise<GallagherGetCardholderDetailResponse> {
        const cardholderDetail =  await CardholderAPI.get(cardholerId)
        return cardholderDetail as GetCardholderResponse
    }

    /**
     * Create a cardholder 
     * 
     * @param cardholderEntity 
     * @returns 
     */
    public async createCardholder(cardholderEntity: CardholderEntity): Promise<CreateCardholderResponse> {
        const gallagherResponse = await CardholderAPI.create(cardholderEntity.toCreateCardholderRequest())

        const cardholderId = gallagherResponse.cardholderId
        const cardholderDetail = await CardholderAPI.get(cardholderId)

        const cards = cardholderDetail.cards
        if (cards) {
            const cardId = this.extractIdFromURL(cards[0].href!)
            return  {
                cardholderId: gallagherResponse.cardholderId,
                card: {
                    cardId: cardId,
                    expiredAt: cardholderEntity.getCardEntity()!.expiredAtInMs()
                }
            }
        }

        return { cardholderId: gallagherResponse.cardholderId }
    }

    /**
     * Refresh existing card of a cardholder
     * 
     * @param cardholderId cardholderId
     * @param existingCardId card to rmove
     * @param cardEntity card to 
     */
    public async refreshCardInCardholder(cardholderId: string, existingCardId: string, cardEntity: CardEntity): Promise<RefreshCardholderCardResponse> {
        const refreshReq: GallagherUpdateCardholderRequest = {
            cards: {
                remove: [
                    { 
                        href: this.buildCardHref(cardholderId, existingCardId)
                    }
                ],
                add: [ cardEntity.getCard() ]
            }
        }
        
        await CardholderAPI.update(cardholderId, refreshReq)

        const cardholderDetail = await CardholderAPI.get(cardholderId)
        const cards = cardholderDetail.cards
        if (!cards) {
            throw AppError.internalServer('Unexceped error: no card find in cardholder.')
        }

        return  {
            cardholderId: cardholderId,
            newCard: {
                cardId: this.extractIdFromURL(cards[0].href!),
                expiredAt: cardEntity.expiredAtInMs()
            }
        } as RefreshCardholderCardResponse
    }

    private buildCardHref(cardholderId: string, existingCardId: string) {
        return `${envs.GALLAGHER_API_URL}api/cardholders/${cardholderId}/cards/${existingCardId}`
    }

    /**
     * Remove cardholder 
     * 
     * @param cardholerId cardholderId to identify cardholder
     * @returns 
     */
    public async removeCardholder(cardholerId: string): Promise<void> {
        return await CardholderAPI.remove(cardholerId) 
    }

    /**
     * To authorise cardholder, it internally calls Cardholder Update API.
     * 
     * @param cardholerId cardholderId to identify cardholder
     * @param authorised true - authorised, false - not authorised.
     * @returns
     */
    public async authoriseCardholder(cardholderId: string, authorised: boolean): Promise<void> {
        const updateRequest: GallagherUpdateCardholderRequest = {
            authorised: authorised
        }
        
        await CardholderAPI.update(cardholderId, updateRequest) 
    }

    /**
     * Add new card to an existing cardholder
     * 
     * @param cardholerId 
     * @param card 
     * @returns 
     */
    public async addCard2Cardholder(cardholderId: string, card: Card): Promise<AddNewCardResponse> {
        const addCardReq: GallagherUpdateCardholderRequest = {
            cards: {
                add: [ card ]
            }
        }
        await CardholderAPI.update(cardholderId, addCardReq)

        const cardholderDetail = await CardholderAPI.get(cardholderId)
        const cards = cardholderDetail.cards
        if (!cards) {
            throw AppError.internalServer('Unexceped error: no card find in cardholder.')
        }

        const newCardId = this.extractIdFromURL(cards[0].href!);

        return {
            newCardId: newCardId
        }
    }

    /**
     * Remove card from an existing cardholder
     * 
     * @param cardholerId 
     * @param cardId 
     * @returns 
     */
    public async removeCardFromCardholder(cardholerId: string, cardId: string): Promise<void> {
        await CardholderAPI.removeCardFromCardholder(cardholerId, cardId)
    }

    /**
     * Extract the item id from Gallagher item url.
     * @param url 
     * @returns 
     */
    private extractIdFromURL(url: string) {
        const urlPieces = url.split('/')
        return urlPieces[urlPieces.length - 1]
    }
}
