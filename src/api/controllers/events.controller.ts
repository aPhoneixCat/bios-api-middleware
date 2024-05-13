import { Body, Get, Query, Route, Tags } from "tsoa";
import { EventRequest, EventResponse } from "../../domain/dtos/event";
import { Actitity, EventType, CardholderCheckinoutEvent } from "../../domain/entities/event";
import { ValidationError } from "../../errors/validation.error";

@Route("events")
@Tags("Events")
export class EventController {
  //* Dependency injection
  constructor() { }

  @Get("/live")
  public async getLiveEvents(@Query() eventType: EventType, @Query() cardholderIds: string[]): Promise<EventResponse> {
    if (!cardholderIds || cardholderIds.length == 0) {
      throw new ValidationError([
        {
          constraint: 'cardholderIds is required',
          fields: ['cardholderIds']
        }
      ]);
    }

    if (eventType == EventType.Cardholder_CheckinCheckout) {
      const events = cardholderIds.map(id => {
        const event: CardholderCheckinoutEvent = {
          cardholderId: id,
          activity: Actitity.Checkin,
          timestamp: 123,
          type: EventType.Cardholder_CheckinCheckout,
          message: "checkin"
        }
        return event
      })

      return { events: events }
    } else {
      const events = cardholderIds.map(id => {
        const event: CardholderCheckinoutEvent = {
          cardholderId: id,
          activity: Actitity.Checkout,
          timestamp: 123,
          type: EventType.Cardholder_CheckinCheckout,
          message: "checkin"
        }
        return event
      })

      return { events: events }
    }
  };

  @Get("/reporting")
  public async reportEvents(@Query() eventType: string, @Query() cardholderIds: string[]): Promise<EventResponse> {
    if (!cardholderIds || cardholderIds.length == 0) {
      throw new ValidationError([
        {
          constraint: 'cardholderIds is required',
          fields: ['cardholderIds']
        }
      ]);
    }

    if (eventType == EventType.Cardholder_CheckinCheckout) {
      const events = cardholderIds.map(id => {
        const event: CardholderCheckinoutEvent = {
          cardholderId: id,
          activity: Actitity.Checkin,
          timestamp: 123,
          type: EventType.Cardholder_CheckinCheckout,
          message: "checkin"
        }
        return event
      })

      return { events: events }
    } else {
      const events = cardholderIds.map(id => {
        const event: CardholderCheckinoutEvent = {
          cardholderId: id,
          activity: Actitity.Checkout,
          timestamp: 123,
          type: EventType.Cardholder_CheckinCheckout,
          message: "checkin"
        }
        return event
      })

      return { events: events }
    }
  };

}