import { HrefMixin, IdentityMixin, OptionalHref } from "../utils";
import { AccessGroupRef, AccessZoneRef, AlarmRef, CardholderEventRef, CardholderRef, DivisionRef, DoorRef, EventGroupRef, ItemRef, ScheduleRef } from "./reference";

/**
 * Access is zone paired with a schedule
 */
export interface AccessSummary extends HrefMixin {
    access_zone: AccessZoneRef
    schdule: ScheduleRef
}

/**
 * AccessGroup Summary is what the API returns on searches
 * 
 * This builds on the Ref class to add the summary fields and 
 * is extended by the Detail class to add the fully remainder of the fields
 */
export interface AccessGroupSummary {
    name: string,
    description?: string,
    parent?: AccessGroupRef,
    division: IdentityMixin,
    cardholders?: HrefMixin,
    server_display_name?: string
}

/**
 * AlarmSource represents a device that has triggered an alarm
 */
export interface AlarmSourceSummary extends HrefMixin, IdentityMixin {
    name: string;
}

export interface AlarmZoneSummary extends HrefMixin, IdentityMixin {
    time: Date;
    message: string;
    source: AlarmSourceSummary;
    type: string;
    event_type?: EventTypeSummary;
    priority: number;
    state: string;
    active: boolean;
    division: HrefMixin;
    event?: HrefMixin;
    note_presets: string[];
    view: HrefMixin;
    comment: HrefMixin;
    acknowledge?: HrefMixin;
    acknowledge_with_comment?: HrefMixin;
    process?: HrefMixin;
    process_with_comment?: HrefMixin;
    force_process?: HrefMixin;
}

export interface CardExpiryTypeSummary {
    expiry_type?: string
}

/**
 * Card summary as sent by the Event objects
 */
export interface CardSummary extends IdentityMixin {
    facility_code: string,
    number: string,
    issue_level: number
}

/**
 * The cardholder search at /api/cardholders returns an array of these. 
 * It is a subset of what you get from a cardholder's detail page at /api/cardholders/{id} 
 */
export interface CardholderSummary extends IdentityMixin, HrefMixin {
    firstName?: string,
    lastName?: string,
    shortName?: string,
    description?: string,
    authorised: boolean
}

export interface DoorSummary extends IdentityMixin, HrefMixin {
    name: string
}

/**
 * Items Types only provide the name and id
 * 
 * This is used by the discovery endpoint and is used by the ItemTypesResponse
 */
export interface ItemTypeSummary {
    id: string,
    name: string,
    canonical_type_name?: string
}

/**
 * Summary of an Item which adds the notes and server_display_name, this is used by the item summary response
 */
export interface ItemSummary extends HrefMixin, IdentityMixin {
    name?: string,
    type: ItemTypeSummary
}

export interface EventTypeSummary extends IdentityMixin {
    name: string;
}

export interface EventGroupSummary extends IdentityMixin {
    name: string;
    eventTypes: EventTypeSummary[];
}

/**
 * Summary of events that have occurred on the server
 */
export interface EventSummary extends HrefMixin, IdentityMixin {
    serverDisplayName?: string;
    time: Date;
    message?: string;
    occurrences?: number;
    priority: number;
    alarm?: AlarmRef;

    operator?: CardholderRef;
    source: ItemRef;
    group?: EventGroupRef;
    type?: EventTypeSummary;
    eventType?: EventTypeSummary;
    division?: DivisionRef;
    cardholder?: CardholderEventRef;
    entryAccessZone?: AccessZoneRef;
    exitAccessZone?: AccessZoneRef;
    door?: DoorRef;
    accessGroup: OptionalHref;
    card?: CardSummary;
    modifiedItem?: ItemSummary;
}

/**
 * Schedule is a time represents
 */
export interface ScheduleSummary extends HrefMixin {
    name: string
}

