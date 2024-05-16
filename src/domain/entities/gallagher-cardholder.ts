// https://gallaghersecurity.github.io/cc-rest-docs/ref/cardholders.html#/definitions/Cardholder%20detail
export interface CardholderSummary {
  href: string
  id: string
  firstName: string | undefined
  lastName: string | undefined
  shortName: string | undefined
  description: string | undefined
  authorised: boolean
}

// https://gallaghersecurity.github.io/cc-rest-docs/ref/cardholders.html#/definitions/Cardholder%20detail
export interface Cardholder {
    href: string
    id: string
    firstName: string | undefined
    lastName: string | undefined
    shortName: string | undefined
    description: string | undefined
    authorised: boolean 
    lastSuccessfulAccessTime: string | undefined
    lastSuccessfulAccessZone: LastSuccessfulAccessZone | undefined
    serverDisplayName: string | undefined
    division: Division
    "@Student ID": string | undefined
    disableCipherPad: boolean | undefined
    usercode: string | undefined
    operatorLoginEnabled: boolean | undefined
    operatorUsername: string | undefined
    operatorPassword: string | undefined
    operatorPasswordExpired: boolean | undefined
    windowsLoginEnabled: boolean | undefined
    windowsUsername: string | undefined
    personalDataDefinitions: PersonalDataDefinition[] | undefined
    cards: Card[]| undefined
    accessGroups: AccessGroup[] | undefined
    operatorGroups: OperatorGroup[] | undefined
    competencies: Competency[] | undefined
    edit: Edit| undefined
    updateLocation: UpdateLocation | undefined
    notes: string | undefined
    notifications: Notifications | undefined
    relationships: Relationship[] | undefined
    lockers: Locker[] | undefined
    elevatorGroups: ElevatorGroup[] | undefined
    updates: Updates | undefined
    redactions: Redaction[] | undefined
  }
  
  export interface LastSuccessfulAccessZone {
    href: string
    name: string
  }
  
  export interface Division {
    href: string
  }
  
  export interface PersonalDataDefinition {
    "@Student ID"?: StudentId
    "@Photo"?: Photo
  }
  
  export interface StudentId {
    href: string
    definition: Definition
    value: string
  }
  
  export interface Definition {
    href: string
    name: string
    id: string
    type: string
  }
  
  export interface Photo {
    href: string
    definition: Definition
    value: Value
  }
  
  export interface Value {
    href: string
  }
  
  export interface Card {
    href: string
    number: string
    cardSerialNumber: string
    issueLevel: number
    status: Status
    type: Type
    invitation: Invitation
    from: string
    until: string
    credentialClass: string
    trace: boolean
    lastPrintedOrEncodedTime: string
    lastPrintedOrEncodedIssueLevel: number
    pin: string
    visitorContractor: boolean
    ownedBySite: boolean
    credentialId: string
    bleFacilityId: string
  }
  
  export interface Status {
    value: string
    type: string
  }
  
  export interface Type {
    href: string
    name: string
  }
  
  export interface Invitation {
    email: string
    mobile: string
    singleFactorOnly: boolean
    status: string
    href: string
  }
  
  export interface AccessGroup {
    href: string
    accessGroup: AccessGroupDetail
    status: Status
    from: string
    until: string
  }
  
  export interface AccessGroupDetail {
    name: string
    href: string
  }
  

  export interface OperatorGroup {
    href: string
    operatorGroup: OperatorGroupDetail
  }
  
  export interface OperatorGroupDetail {
    name: string
    href: string
  }
  
  export interface Competency {
    href: string
    competency: CompetencyDetail
    status: Status
    expiryWarning: string
    expiry: string
    enablement: string
    comment: string
    limitedCredit: boolean
    credit: number
  }
  
  export interface CompetencyDetail {
    href: string
    name: string
  }
  
  export interface Edit {
    href: string
  }
  
  export interface UpdateLocation {
    href: string
  }
  
  export interface Notifications {
    enabled: boolean
    from: string
    until: string
  }
  
  export interface Relationship {
    href: string
    role: Role
    cardholder: RelatedCardholder
  }
  
  export interface Role {
    href: string
    name: string | undefined
  }
  
  export interface RelatedCardholder {
    href: string
    name: string | undefined
    firstName: string | undefined
    lastName: string | undefined
  }
  
  export interface Locker {
    href: string
    locker: LockerDetail
    from: string
    until: string
  }
  
  export interface LockerDetail{
    name: string
    shortName: string
    lockerBank: LockerBank
    href: string
  }
  
  export interface LockerBank {
    href: string
    name: string
  }
  
  export interface ElevatorGroup {
    href: string
    elevatorGroup: ElevatorGroupDetail
    accessZone: AccessZone
    enableCaptureFeatures: boolean
    enableCodeBlueFeatures: boolean
    enableExpressFeatures: boolean
    enableServiceFeatures: boolean
    enableService2Features: boolean
    enableService3Features: boolean
    enableVipFeatures: boolean
  }
  
  export interface ElevatorGroupDetail {
    href: string
    name: string
  }
  
  export interface AccessZone {
    href: string
    name: string
  }
  
  export interface Updates {
    reserved: string
  }
  
  export interface Redaction {
    href: string
    type: string
    when: string
    before: string
    status: string
    redactionOperator: RedactionOperator
  }
  
  export interface RedactionOperator {
    name: string
    href: string
  }
  