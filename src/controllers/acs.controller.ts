import { Get, Post, Body, Path, Route, Tags, Delete, Controller, Patch, Query, Produces } from "tsoa";
import { AddCardToCardholderRequest, CreateCardholderRequest, CreateCardholderResponse, GetCardholderResponse, UpdateCardholderRequest } from "../domain/dtos/acs";
import ACSService from "../services/acs.services";
import { CardEntity, CardholderEntity } from "../domain/entities/cardholder";
import { provideSingleton } from "../utils/provideSingleton";
import { inject } from "inversify/lib/annotation/inject";
import { HttpCode } from "../constants";

@Route("acs")
@Tags("ACS")
@Produces('application/json')
@provideSingleton(ACSController)
export class ACSController extends Controller {

  // Dependency Injection
  constructor(@inject(ACSService) private acsService: ACSService) {
    super();
  }

  @Get("/cardholders/{cardholderId}")
  public async getCardholder(@Path() cardholderId: string): Promise<GetCardholderResponse> {
    return await this.acsService.getCardholder(cardholderId)
  }
  
  @Post("/cardholders")
  public async createCardholder(@Body() reqB: CreateCardholderRequest): Promise<CreateCardholderResponse> {
    var cardEntity;
    if (reqB.card2Add) {
      cardEntity = new CardEntity(reqB.card2Add?.cardNumber, reqB.card2Add?.fromInMs, reqB.card2Add?.validityPeriodInMs)
    } 

    const cardholder  = new CardholderEntity(reqB.userType, reqB.userName, reqB.authorised, cardEntity || undefined)

    return await this.acsService.createCardholder(cardholder)
  }

  // TODO
  @Patch("/cardholers/{cardholderId}")
  public async updateCardholder(@Path() cardholderId: string, @Body() reqB: UpdateCardholderRequest): Promise<void> { 
    await this.acsService.updateCardholder(cardholderId, new CardholderEntity())

    this.setStatus(HttpCode.NO_CONTENT)
  }

  @Delete("/cardholders/{cardholderId}")
  public async removeCardholder(@Path() cardholderId: string): Promise<void> { 
    await this.acsService.removeCardholder(cardholderId)
    
    this.setStatus(HttpCode.NO_CONTENT)
  }

  @Get("/cardholders/{cardholderId}/activate")
  public async activateCardholder(@Path() cardholderId: string, @Query() authorised: boolean): Promise<boolean> { 
    return await this.acsService.authoriseCardholder(cardholderId, authorised)
  }

  @Post("/cardholders/{cardholderId}/cards")
  public async addCard2Cardholder(@Path() cardholderId: string, @Body() reqB: AddCardToCardholderRequest) { 
    const cardInfo  = new CardEntity(
      reqB.cardNumber, reqB.validityPeriodInMs, reqB.fromInMs
    )

    return await this.acsService.addCard2Cardholder(cardholderId, cardInfo.getCard())
  }

  @Delete("/cardholders/{cardholderId}/cards/{cardId}")
  public async removeCardFromCardholder(@Path() cardholderId: string, @Path() cardId: string) { 
    return await this.acsService.removeCardFromCardholder(cardholderId, cardId)
  }

}