export interface EventDetail {
  href: string
  id: string
  serverDisplayName?: string
  time?: Date
  message?: string
  occurrences?: number
  priority?: number
  alarm?: Alarm
  operator?: Operator
  source?: Source
  group?: Group
  type?: Type
  eventType?: EventType
  division?: Division
  cardholder?: Cardholder
  entryAccessZone?: EntryAccessZone
  exitAccessZone?: ExitAccessZone
  door?: Door
  accessGroup?: AccessGroup
  card?: Card
  modifiedItem?: ModifiedItem
  next?: Next
  previous?: Previous
  updates?: Updates
  lastOccurrenceTime?: string
  details?: string
  location?: Location
}

export interface Alarm {
  state: string
  href: string
}

export interface Operator {
  href: string
  name: string
}

export interface Source {
  id: string
  name: string
  href: string
}

export interface Group {
  id: string
  name: string
}

export interface Type {
  id: string
  name: string
}

export interface EventType {
  id: string
  name: string
}

export interface Division {
  id: string
  href: string
  name: string
}

export interface Cardholder {
  href: string
  id: string
  name: string
  firstName: string
  lastName: string
}

export interface EntryAccessZone {
  href: string
  name: string
  id: string
}

export interface ExitAccessZone {
  href: string
  name: string
  id: string
}

export interface Door {
  href: string
  name: string
}

export interface AccessGroup {
  href: string
}

export interface Card {
  facilityCode: string
  number: string
  issueLevel: number
}

export interface ModifiedItem {
  href: string
  type: Type
}

export interface Next {
  href: string
}

export interface Previous {
  href: string
}

export interface Updates {
  href: string
}

export interface Location {
  type: string
  cardholder: Cardholder
  beforeLocation: BeforeLocation
  afterLocation: AfterLocation
}

export interface BeforeLocation {
  href: string
  name: string
  canonicalTypeName: string
}

export interface AfterLocation {
  outside: boolean
}
