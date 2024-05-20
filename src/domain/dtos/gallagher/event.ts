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
// TBD

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
