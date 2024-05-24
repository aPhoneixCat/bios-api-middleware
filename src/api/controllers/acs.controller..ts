import { Get, Post, Body, Path, Route, Tags, Delete } from "tsoa";
import { CreateCardholderRequest } from "../../domain/dtos/acs";

@Route("acs")
@Tags("acs")
export class ACSController {

  //* Dependency injection
  constructor() { }

  @Post("/cardholders")
  public async createCardholder(@Body() body: CreateCardholderRequest) { 
    
  }

  @Post("/cardholers/{cardholderId}")
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