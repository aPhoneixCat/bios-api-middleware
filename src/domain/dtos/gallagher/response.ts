import { HrefMixin } from "../utils";
import { CardTypeDetail, DivisionDetail } from "./detail";
import { DayCategoryRef, PDFRef } from "./reference";
import { AlarmZoneSummary, CardholderSummary, DoorSummary, EventGroupSummary, EventSummary, ItemTypeSummary, ScheduleSummary } from "./summary";

/**
 * AlarmResponse represents a single alarm
 */
export interface AlarmResponse {
    alarms: AlarmZoneSummary[]
    updates: HrefMixin
}

/**
 * Card Types are cards mobile or physical that are supported at a site
 */
export interface CardTypeResponse {
    results: CardTypeDetail[],
    next?: HrefMixin
}

/**
 * Summary response for cardholder list and search
 *
 * /api/cardholders is generally the endpoint that responds to the query, 
 * it is dynamically configured from the discovery
 */
export interface CardholderSummaryResponse {
    results: CardholderSummary[]
}

/**
 * The response has a list of results and a link to the next page
 */
export interface DayCategoryResponse {
    results: DayCategoryRef[]
}

/**
 * Division
 */
export interface DivisionDetailResponse {
    results: DivisionDetail[],
    next?: HrefMixin
}

export interface DoorResponse {
    results: DoorSummary[]
}

export interface EventSummaryResponse {
    events: EventSummary[],
    
    next: HrefMixin,
    previous: HrefMixin,
    updates: HrefMixin
}

/**
 * Event Type Response
 * 
 * Event Type Responses return a set of eventGroups which in turn has identifiers, names and event types.
 */
export interface EventTypeResponse {
    event_groups: EventGroupSummary[]
}

/**
 * Every security centre can provide a list of item types
 * 
 * https://gallaghersecurity.github.io/cc-rest-docs/ref/events.html#/definitions/Item%20detail
 */
export interface ItemTypesResponse {
    item_type: ItemTypeSummary[]
}

/**
 * Personal Definition fields
 * 
 * Returned as a set of results, each result is a PDFRef these are to be cached just as we do the URL endpoints, 
 * note that this must be done after the discovery completes
 */
export interface PDFResponse {
    results: PDFRef[]
}

/**
 * Schedule is a time represents
 */
export interface ScheduleSummaryResponse {
    results: ScheduleSummary[]
}
