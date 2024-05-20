import { HrefMixin, IdentityMixin, OptionalHref } from '../utils'

// Ref are References to other objects, usually contain a href and possibly additional meta data such as a name or id

/**
 *  Access Groups is what a user is assigned to to provide access to doors
 */
export interface AccessGroupRef extends HrefMixin {
    name: string
}

/**
 * AlarmRef represents a single alarm
 */
export interface AlarmRef extends HrefMixin {
    state: string
}

/**
 * Alarm's AccessZone represents
 */
export interface AlarmZoneRef extends HrefMixin {
    name: string
}

/**
 * Reference to a cardholder
 */
export interface CardholderRef extends HrefMixin {
    name: string
}

/**
 * Reference to a card type
 */
export interface CardTypeRef extends HrefMixin {
    name: string
}

/**
 * Cardholder ref used with events:
 * 
 *  Events seem to send partial information where href is missing at times
    (this is contrary to the documentation), name and id seem to always
    be present. This is likely because this is a summary
 */
export interface CardholderEventRef extends IdentityMixin, OptionalHref {
    name: string,
    firstName?: string,
    lastName?: string
}

/**
 *  A reference to a day category
 */
export interface DayCategoryRef extends HrefMixin {
    name: string
}

/**
 * Division reference is used to link to a division
 * 
 * The Mixins cover all the fields that are returned in the summary, hence nothing has to be declared in the body
 */
export interface DivisionRef extends IdentityMixin, OptionalHref { }

export interface DoorRef extends HrefMixin {
    name: string
}

/**
 * Event Group Reference
 * 
 * A reference to an event group, it is used in the event type response.
 */
export interface EventGroupRef extends IdentityMixin {
    name: string
}

/**
 * Reference to an ItemType
 */
export interface ItemRef extends HrefMixin {
    name: string
}

/**
 * Personal Data Fields are custom fields for a card holder
 * 
 * These are defined per command centre installation and the fields 
 * are prefixed with @ e.g @Personal URL, note the presence of the spacein the field name. 
 * Since they are dynamic we will have to discover the personal data fields 
 * much like the URL discovery before we are able to parse the data
 */
export interface PDFRef extends HrefMixin {
    name: string
}

/**
 * Schedule represents a time
 */
export interface ScheduleRef extends HrefMixin {
    name: string
}

/**
 * AccessZone represents
 */
export interface AccessZoneRef extends HrefMixin {
    name: string
}

export interface OperatorGroupRef extends HrefMixin {
    name: string
}

export interface CompetencyRef extends HrefMixin {
    name: string
}

export interface RoleRef extends HrefMixin {
    name: string
}

export interface ElevatorGroupRef extends HrefMixin {
    name: string
}

export interface OperatorRef extends HrefMixin {
    name: string
}

export interface AlarmRef extends HrefMixin {
    state: string
}

// Pagination Ref
export interface Next extends HrefMixin { }

// Pagination Ref
export interface Previous extends HrefMixin { }

// Pagination Ref
export interface Updates extends HrefMixin { }