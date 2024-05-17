import { IdentityMixin, HrefMixin } from '../utils';
import { AlarmZoneSummary, AccessSummary, CardExpiryTypeSummary, CardSummary, AccessGroupSummary } from './summary';
import { AccessGroupRef, AccessZoneRef, AlarmRef, CardholderRef, DivisionRef, DoorRef, ItemRef, PDFRef } from './reference';
import { Status } from '../../entities/gallagher-cardholder';

export interface DivisionDetail extends IdentityMixin, HrefMixin {
    name: string,
    description?: string,
    server_display_name?: string,
    parent?: HrefMixin
}

export interface AccessGroupDetail extends HrefMixin {
    name: string;
    description?: string;
    parent?: AccessGroupRef;
    division: DivisionDetail;
    cardholders?: HrefMixin;
    server_display_name?: string;
    children: AccessGroupRef[];
    personal_data_definitions: PDFRef[];

    visitor: boolean;
    escort_visitors: boolean;
    lock_unlock_access_zones: boolean;
    enter_during_lockdown: boolean;
    first_card_unlock: boolean;
    override_aperio_privacy: boolean;
    aperio_offline_access: boolean;
    disarm_alarm_zones: boolean;
    arm_alarm_zones: boolean;
    hvLf_fence_zones: boolean;
    view_alarms: boolean;
    shunt: boolean;
    lock_out_fence_zones: boolean;
    cancel_fence_zone_lockout: boolean;
    ack_all: boolean;
    ack_below_high: boolean;
    select_alarm_zone: boolean;
    arm_while_alarm: boolean;
    arm_while_active_alarm: boolean;
    isolate_alarm_zones: boolean;

    access: AccessSummary[];
    alarm_zones: AlarmZoneSummary[];
}

export interface CardTypeDetail extends IdentityMixin, HrefMixin {
    name: string;
    minimum_number: string | null;
    maximum_number: string | null;
    initial_card_state: string;
    facility_code: string;
    credential_class: string;
    available_card_states: string[] | null;
    default_expiry: CardExpiryTypeSummary | null;
    send_registration_email: boolean | null;
    send_registration_sms: boolean | null;
}

/**
 * Card detail for creating cardholder
 */
export interface CardDetail {
    type?: HrefMixin,
    from?: Date,
    until?: Date,
    status?: Status,
    number?: string
}

/**
 * Card detail for returning card information
 */
export type CardDetailWithRef = CardDetail & HrefMixin

/**
 * Ref to https://gallaghersecurity.github.io/cc-rest-docs/ref/cardholders.html#/definitions/Cardholder%20detail
 */
export interface CardholderDetail extends IdentityMixin {
  firstName?: string;
  lastName?: string;
  shortName?: string;
  description?: string;
  authorised?: boolean;
  lastSuccessfulAccessTime?: Date;
  lastSuccessfulAccessZone?: AccessZoneRef;
  severDisplayName?: string;

  division?: DivisionRef;
  disableCipherPad?: boolean;
  usercode?: string;
  edit?: HrefMixin;
  //TODO
  personalDataDefinitions?: any
  cards?: CardDetailWithRef | CardDetailWithRef
  accessGroups?: AccessGroupSummary

  operatorLoginEnabled: boolean;
  operatorPasswordExpired: boolean;

  updateLocation: HrefMixin;
  updates: HrefMixin;

  userExtendedAccessTime: boolean;
  windowsLoginEnabled: boolean;
}

export interface DivisionDetail extends IdentityMixin, HrefMixin {
    name: string;
    description?: string;
    server_display_name?: string;
    parent?: HrefMixin;
}

export interface EventDetail extends HrefMixin, IdentityMixin {
    server_display_name: string;
    time: Date;
    message?: string;
    occurrences: number;
    priority: number;
    alarm: AlarmRef;

    operator: CardholderRef;
    source: ItemRef;
    entry_access_zone: AccessZoneRef;
    exit_access_zone: AccessZoneRef;
    door: DoorRef;
    access_group: HrefMixin;
}

/**
 * Personal Data Fields are custom fields for a card holder
 */
export interface PDFDetail extends HrefMixin {
    name: string,
    description?: string,
    division: IdentityMixin,
    server_display_name?: string
}

export interface RoleDetail extends IdentityMixin, HrefMixin {
    name: string,
    server_display_name: string,
    description?: string,
    division: DivisionRef
}






