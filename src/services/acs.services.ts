import { CreateCardholderResponse } from "../domain/dtos/acs";
import { CardholderEntity } from "../domain/entities/cardholder";
import { Cardhodlers as CardHoldersAPI  } from "../lib/gallagher-api/cardholders.api";

export default class ACSService {

    public async createCardholder(cardholderEntity: CardholderEntity): Promise<CreateCardholderResponse> {
        const gallagherResponse = await new CardHoldersAPI().create(cardholderEntity.toCreateCardholderRequest())
        const cardHolderRes: CreateCardholderResponse = {
            cardholderId: gallagherResponse.cardholderId,
            expiredAt: cardholderEntity.expiredAtInMs()
        }

        return Promise.resolve(cardHolderRes)
    }
}

