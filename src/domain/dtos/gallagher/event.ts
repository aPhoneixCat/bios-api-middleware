import { HrefMixin, IdentityMixin, OptionalHref } from "../utils"
import { AccessZoneRef, AlarmRef, DivisionRef, Next, OperatorRef, Previous, Updates } from "./reference"

export interface EventSummary extends IdentityMixin, HrefMixin {
  serverDisplayName: string
  time: string
  message: string
  occurrences: number
  priority: number
  alarm: AlarmRef
  operator: OperatorRef
  source: AlarmSource
  group: EventGroup
  type: EventType
  eventType: EventType
  division: EventDivison
  cardholder: Cardholder
  entryAccessZone: AccessZone
  exitAccessZone: AccessZone
  door: Door
  accessGroup: AccessGroup
  card: Card
  modifiedItem: ModifiedItem
  next: Next
  previous: Previous
  updates: Updates
}

export interface EventDetail extends IdentityMixin, HrefMixin {
  serverDisplayName: string
  time: string
  message: string
  occurrences: number
  priority: number
  alarm: AlarmRef
  operator: OperatorRef
  source: AlarmSource
  group: EventGroup
  type: EventType
  eventType: EventType
  division: EventDivison
  cardholder: Cardholder
  entryAccessZone: AccessZone
  exitAccessZone: AccessZone
  door: Door
  accessGroup: AccessGroup
  card: Card
  modifiedItem: ModifiedItem
  next: Next
  previous: Previous
  updates: Updates
  lastOccurrenceTime: string
  details: string
  location: EventLocation
}

export interface EventGroup extends IdentityMixin {
  name: string
}

export interface EventType extends IdentityMixin, OptionalHref {
  name: string
}

export interface EventDivison extends DivisionRef {
  name: string
}


export interface Cardholder extends IdentityMixin, HrefMixin {
  name: string
  firstName: string
  lastName: string
}

export interface AccessZone extends AccessZoneRef {
  name: string
}

export interface Door extends HrefMixin {
  name: string
}

export interface AccessGroup extends HrefMixin { }

export interface Card {
  facilityCode: string
  number: string
  issueLevel: number
}

export interface ModifiedItem extends HrefMixin {
  type: ItemType
}

export interface ItemType extends IdentityMixin {
  name: string
}

export interface AlarmSource extends IdentityMixin, HrefMixin {
  name: string
}

export interface EventLocation {
  type: string
  cardholder: Cardholder
  beforeLocation: BeforeLocation
  afterLocation: AfterLocation
}

export interface Cardholder extends HrefMixin {
  name: string
}

export interface BeforeLocation extends HrefMixin {
  name: string
  canonicalTypeName: string
}

export interface AfterLocation {
  outside: boolean
}

// ======================= Request ===========================

// https://gallaghersecurity.github.io/cc-rest-docs/ref/events.html
export interface EventSearchParams {
  top?: number, // Sets the maximum number of events to return per page. Default = 1000
  after?: string, // // Extended ISO-8601 time stamp formats
  before?: string, // Extended ISO-8601 time stamp formats
  source?: string, // Restricts events to those whose source item has this ID. Separate multiple IDs with commas
  type?: string,  // Restricts events to those whose type has this ID. Separate multiple IDs with commas.
  group?: string, // Restricts events to those with this event group ID. Separate multiple IDs with commas.
  cardholder?: string // Restricts events to those associated with the cardholder that has this Command Centre ID. Separate multiple IDs with commas.
  division?: string, // Restricts events to those in these divisions or their descendants. Separate IDs with commas.
  directDivision?: string, // Restricts events to those whose division is in this list. Unlike division=, it does not follow ancestry. Separate IDs with commas.
  relatedItem?: string, // Restrict events to those associated with the item that has this Command Centre ID. Separate multiple IDs with commas.
  fields?: string, // Sets the fields you want in your results.
  previous?: boolean // Returns the newest events rather than the oldest. Default = false
  pos?: number // Restricts events to those with event IDs greater than this parameter (or less than and including, if you set previous=true).
} 

// ======================= Response ==========================
// Event related response

export interface EventSearchResponse {
  events: EventSummary[],

  next: Next,
  previous: Previous,
  updates: Updates
}

export type EventDetailResponse = EventDetail

export interface EventTypeListResponse {
  eventsGroups: EventGroup[]
}
