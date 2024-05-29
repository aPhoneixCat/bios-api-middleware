import { Get, Post, Body, Path, Route, Tags, Delete, Controller, Patch } from "tsoa";
import { CreateCardholderRequest, CreateCardholderResponse } from "../domain/dtos/acs";
import ACSService from "../services/acs.services";
import { CardholderEntity } from "../domain/entities/cardholder";
import Logger from "../lib/logger";

@Route("acs")
@Tags("ACS")
export class ACSController extends Controller {

  // private readonly acsService: ACSService

  @Post("/cardholders")
  public async createCardholder(@Body() requestBody: CreateCardholderRequest): Promise<CreateCardholderResponse> { 
    Logger.debug(`request body: ${requestBody.cardNumber}`, )
    const userInfo  = new CardholderEntity(
      requestBody.userType, requestBody.userName, requestBody.cardNumber, requestBody.validityPeriodInMs
    )

    return new ACSService().createCardholder(userInfo)
  }

  @Patch("/cardholers/{cardholderId}")
  public async updateCardholder(@Path() cardholderId: string) { }

  @Delete("/cardholders/{carholderId}")
  public async removeCardholder() { }

  @Post("/cardholders/{carholderId}/cards")
  public async addCard2Cardholder() { }

  @Post("/cardholders/{carholderId}/cards/{cardId}")
  public async removeCardFromCardholder() { }

  @Get("/cardholders/{carholderId}/activate")
  public async activateCardholder() { }

}