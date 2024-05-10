import { CardholderCheckinoutEvent } from "../entities/event"

export interface EventRequest {
  cardholderIds: string[],
  from?: number
  to?: number
}

export interface EventResponse {
  events: CardholderCheckinoutEvent[]
}
