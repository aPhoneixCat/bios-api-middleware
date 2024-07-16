import { IdentityMixin, HrefMixin, OptionalHref } from "../utils";
import { AccessGroupRef, AccessZoneRef, CardTypeRef, CompetencyRef, OperatorGroupRef, OperatorRef, RoleRef } from "./reference";

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
export interface CardholderDetail {
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
  personalDataDefinitions?: PersonalDataDefinition[];
  cards?: Card[];
  accessGroups?: AccessGroup[];
  operatorGroups?: OperatorGroup[];
  competencies?: Competency[];
  updateLocation?: HrefMixin;
  notes?: string;
  notifications?: Notifications;
  relationships?: Relationship[];
  lockers?: Locker[];
  elevatorGroups?: ElevatorGroup[];
  redactions?: Redaction[];
}

export interface Redaction {
  href: string;
  type: string;
  when: string;
  before: string;
  status: string;
  redactionOperator: OperatorRef;
}

export interface ElevatorGroup {
  href: string;
  elevatorGroup: OperatorGroupRef;
  accessZone: AccessZoneRef;
  enableCaptureFeatures: boolean;
  enableCodeBlueFeatures: boolean;
  enableExpressFeatures: boolean;
  enableServiceFeatures: boolean;
  enableService2Features: boolean;
  enableService3Features: boolean;
  enableVipFeatures: boolean;
}

export interface Locker {
  href: string;
  locker: AllocatedLocker;
  from: string;
  until: string;
}

export interface LockerBank extends HrefMixin {
  name: string
}

export interface AllocatedLocker extends HrefMixin {
  name: string
  shortName: string;
  lockerBank: Locker;
}

export interface Relationship {
  href: string;
  role: RoleRef;
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
  href?: string;
  competency?: CompetencyRef;
  enabled?: boolean
  status?: Status;
  expiryWarning?: string;
  expiry?: string;
  enablement?: string;
  comment?: string;
  limitedCredit?: boolean;
  credit?: number;
}

export interface OperatorGroup {
  href: string;
  operatorGroup: OperatorGroupRef;
}

export interface AccessGroup extends OptionalHref {
  accessGroup?: AccessGroupRef;
  status?: Status;
  from?: string;
  until?: string;
}

export interface Card extends OptionalHref {
  number?: string;
  cardSerialNumber?: string;
  issueLevel?: number;
  status?: Status;
  type?: CardTypeRef | HrefMixin;
  invitation?: Invitation;
  from?: string;
  until?: string;
  credentialClass?: string;
  trace?: boolean;
  lastPrintedOrEncodedTime?: string;
  lastPrintedOrEncodedIssueLevel?: number;
  pin?: string;
  visitorContractor?: boolean;
  ownedBySite?: boolean;
  credentialId?: string;
  bleFacilityId?: string;
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

// ======================= Request ==========================
export type GallagherCreateCardholderRequest = CardholderDetail
export interface GallagherUpdateCardholderRequest {
  authorised?: boolean,
  "@email"?: string,
  "@phone"?: string,
  cards?: CardOperation
}

export interface CardOperation {
  add?: Card[],
  update?: Card[],
  remove?: Card[]
}

export interface AccessGroupOperation {
  add?: AccessGroup[],
  update?: AccessGroup[],
  remove?: AccessGroup[]
}



// ======================= Response =========================
export type GallagherCreateCardholderResponse = HrefMixin & {
  cardholderId: string,
}

/**
 * Response cardholder list and search
 *
 */
export interface GallagherCardholderSearchResponse {
  results: CardholderSummary[],

  next?: HrefMixin
}

export type GallagherGetCardholderDetailResponse = CardholderDetail & IdentityMixin & HrefMixin