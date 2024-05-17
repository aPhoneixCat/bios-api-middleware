import { IdentityMixin, HrefMixin } from "../utils";
import { AccessZoneRef, DivisionRef } from "./reference";

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
/**
 * https://gallaghersecurity.github.io/cc-rest-docs/ref/cardholders.html#definition-Cardholder-card
 */
export interface CardholderSearchResponse {
    results: CardholderSummary[],
    next?: HrefMixin
}

/**
 * https://gallaghersecurity.github.io/cc-rest-docs/ref/cardholders.html#definition-Cardholder-card
 */
export interface CardholderDetail extends IdentityMixin, HrefMixin  {
    firstName?: string;
    lastName?: string;
    shortName?: string;
    description?: string;
    authorised: boolean;
    lastSuccessfulAccessTime?: string;
    lastSuccessfulAccessZone?: AccessZoneRef;
    serverDisplayName?: string;
    division?: HrefMixin;
    '@email'?: string;
    '@phone'?: string;
    // disableCipherPad?: boolean;
    // usercode?: string;
    // operatorLoginEnabled?: boolean;
    // operatorUsername?: string;
    // operatorPassword?: string;
    // operatorPasswordExpired?: boolean;
    // windowsLoginEnabled?: boolean;
    // windowsUsername?: string;
    personalDataDefinitions: PersonalDataDefinition[];
    cards: Card[];
    accessGroups: AccessGroup[];
    operatorGroups: OperatorGroup[];
    competencies: Competency[];
    edit: Division;
    updateLocation: Division;
    notes: string;
    notifications: Notifications;
    relationships: Relationship[];
    lockers: Locker2[];
    elevatorGroups: ElevatorGroup[];
    updates: Updates;
    redactions: Redaction[];
  }
  
  export interface Redaction {
    href: string;
    type: string;
    when: string;
    before: string;
    status: string;
    redactionOperator: LastSuccessfulAccessZone;
  }
  
  export interface Updates {
    reserved: string;
  }
  
  export interface ElevatorGroup {
    href: string;
    elevatorGroup: LastSuccessfulAccessZone;
    accessZone: LastSuccessfulAccessZone;
    enableCaptureFeatures: boolean;
    enableCodeBlueFeatures: boolean;
    enableExpressFeatures: boolean;
    enableServiceFeatures: boolean;
    enableService2Features: boolean;
    enableService3Features: boolean;
    enableVipFeatures: boolean;
  }
  
  export interface Locker2 {
    href: string;
    locker: Locker;
    from: string;
    until: string;
  }
  
  export interface Locker {
    name: string;
    shortName: string;
    lockerBank: LastSuccessfulAccessZone;
    href: string;
  }
  
  export interface Relationship {
    href: string;
    role: LastSuccessfulAccessZone;
    cardholder: Cardholder;
  }
  
  export interface Cardholder {
    href: string;
    name: string;
    firstName: string;
    lastName: string;
  }
  
  export interface Notifications {
    enabled: boolean;
    from: string;
    until: string;
  }
  
  export interface Competency {
    href: string;
    competency: LastSuccessfulAccessZone;
    status: Status;
    expiryWarning: string;
    expiry: string;
    enablement: string;
    comment: string;
    limitedCredit: boolean;
    credit: number;
  }
  
  export interface OperatorGroup {
    href: string;
    operatorGroup: LastSuccessfulAccessZone;
  }
  
  export interface AccessGroup {
    href: string;
    accessGroup: LastSuccessfulAccessZone;
    status: Status;
    from: string;
    until: string;
  }
  
  export interface Card extends HrefMixin {
    number: string;
    cardSerialNumber: string;
    issueLevel: number;
    status: Status;
    type: LastSuccessfulAccessZone;
    invitation: Invitation;
    from: string;
    until: string;
    credentialClass: string;
    trace: boolean;
    lastPrintedOrEncodedTime: string;
    lastPrintedOrEncodedIssueLevel: number;
    pin: string;
    visitorContractor: boolean;
    ownedBySite: boolean;
    credentialId: string;
    bleFacilityId: string;
  }
  
  export interface Invitation {
    email: string;
    mobile: string;
    singleFactorOnly: boolean;
    status: string;
    href: string;
  }
  
  export interface Status {
    value: string;
    type: string;
  }
  
  export interface PersonalDataDefinition {
    '@email'?: Pdf;
    '@phone'?: Pdf;
  }
  
  export interface Pdf {
    href: string;
    definition: PdfDefinition;
    value: HrefMixin;
  }
  
  export interface PdfDefinition {
    href: string;
    name: string;
    id: string;
    type: string;
  }
  
  export interface Division {
    href: string;
  }
  
  export interface LastSuccessfulAccessZone {
    href: string;
    name: string;
  }