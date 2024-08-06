import { envs } from "../config/env";
import { AddNewCardResponse, CreateCardholderResponse, GetCardholderResponse, LinkStaffCardholderResponse, RefreshCardholderCardResponse } from "../domain/dtos/acs";
import { Card, CompetencyOperation, GallagherGetCardholderDetailResponse, GallagherUpdateCardholderRequest } from "../domain/dtos/gallagher/cardholder";
import { CardEntity, CardholderEntity, UserType } from "../domain/entities/cardholder";
import { AppError } from "../errors/custom.error";
import CardholderAPI from "../lib/gallagher-api/cardholders.api";
import Logger from "../lib/logger";
import { provideSingleton } from "../utils/provideSingleton";

@provideSingleton(ACSService)
export default class ACSService {
  
    /**
     * get cardholder by staff id
     * 
     * @returns 
     */
    public async getCardholderByStaffId(staffId: string, cardInfo: CardEntity | undefined): Promise<LinkStaffCardholderResponse> {
        const cardholders =  await CardholderAPI.searchCardholderByStaffId(staffId)
        if (!cardholders?.results) {
            throw AppError.internalServer(`No cardholder found for staff[${staffId}]`)
        }

        if (cardholders.results.length > 1) {
            throw AppError.internalServer(`Found more than one cardholder for staff[${staffId}]`)
        }
        
        const cardholder = cardholders.results[0]
        if (cardInfo) {
            const newCardRes = await this.addCard2Cardholder(cardholder.id, cardInfo.getCard())
            return {
                cardholderId: cardholder.id,
                card: {
                    cardId: newCardRes.newCardId,
                    expiredAt: cardInfo.expiredAtInMs()
                }
            }
        }

        return { cardholderId: cardholder.id }
    }

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

        const newCard = cards.find(x => x.number === cardEntity.getCard().number)
        if (!newCard) {
            throw AppError.internalServer(
                `Unexpected error: cannot find new card after refreshing, cardholder=${cardholderId}, existingCardNumber=${cardEntity.getCard().number}`
            )
        }

        return  {
            cardholderId: cardholderId,
            newCard: {
                cardId: this.extractIdFromURL(newCard.href!),
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
    public async authoriseCardholder(cardholderId: string, authorised: boolean, userType: UserType): Promise<void> {
        const cardholderDetail = await CardholderAPI.get(cardholderId)
        const cardholderCompetency = cardholderDetail.competencies?.find(
            x => x.competency?.href === envs.GALLAGHER_VISITOR_COMPETENCY
        )
        // if visitor, will also enable the competency
        if (!cardholderCompetency) {
            Logger.warn(`Cannot find cardholderCompetency link for ${cardholderId} and ${envs.GALLAGHER_VISITOR_COMPETENCY}`)
        }
        const updateCompetencyOperation = authorised && userType == UserType.VISITOR ? {
            update: [
                {
                    href: cardholderCompetency?.href,
                    enabled: true
                }
            ]
        } as CompetencyOperation : undefined

        const updateRequest: GallagherUpdateCardholderRequest = {
            authorised: authorised,
            competencies: updateCompetencyOperation
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

        const newCard = cards.find(x => x.number === card.number)
        if (!newCard) {
            throw AppError.internalServer(
                `Unexpected error: cannot find new card after adding, cardholder=${cardholderId}, existingCardNumber=${card.number}`
            )
        }

        const newCardId = this.extractIdFromURL(newCard.href!);

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
