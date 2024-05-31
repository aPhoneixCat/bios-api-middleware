import { CreateCardholderResponse, UpdateCardholderResponse } from "../domain/dtos/acs";
import { Card, GallagherGetCardholderDetailResponse, GallagherUpdateCardholderRequest } from "../domain/dtos/gallagher/cardholder";
import { CardholderEntity } from "../domain/entities/cardholder";
import CardholderAPI from "../lib/gallagher-api/cardholders.api";
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
        return await CardholderAPI.get(cardholerId) 
    }

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

    // TODO
    public async updateCardholder(cardholderId: string, cardholderUpdateEntity: CardholderEntity): Promise<boolean> {
        return true
    }

    /**
     * Remove cardholder 
     * 
     * @param cardholerId cardholderId to identify cardholder
     * @returns 
     */
    public async removeCardholder(cardholerId: string): Promise<boolean> {
        return await CardholderAPI.remove(cardholerId) 
    }

    /**
     * To authorise cardholder, it internally calls Cardholder Update API.
     * 
     * @param cardholerId cardholderId to identify cardholder
     * @param authorised true - authorised, false - not authorised.
     * @returns
     */
    public async authoriseCardholder(cardholerId: string, authorised: boolean): Promise<boolean> {
        const updateRequest: GallagherUpdateCardholderRequest = {
            authorised: authorised
        }
        
        return await CardholderAPI.update(cardholerId, updateRequest) 
    }

    public async addCard2Cardholder(cardholerId: string, card: Card): Promise<boolean> {
        const addCardReq: GallagherUpdateCardholderRequest = {

        }
        return await CardholderAPI.addCard2Cardholder(cardholerId, addCardReq)
    }

    public async removeCardFromCardholder(cardholerId: string, cardId: string): Promise<boolean> {
        return await CardholderAPI.removeCardFromCardholder(cardholerId, cardId)
    }

    private extractIdFromURL(url: string) {
        const urlPieces = url.split('/')
        return urlPieces[urlPieces.length - 1]
    }
}
