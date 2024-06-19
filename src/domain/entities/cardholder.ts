import moment from "moment";

import { AccessGroup, Card, CardOperation, GallagherCreateCardholderRequest, GallagherUpdateCardholderRequest } from "../dtos/gallagher/cardholder";
import { HrefMixin } from "../dtos/utils";
import { envs } from "../../config/env";
import { Floor, Room } from "../../config/floors";

// Visitor, vip, staff, shall have different division, access group
export enum UserType {
    VISITOR = "visitor",
    STAFF = "staff",
    VIP = "vip"
}

export enum CardState {
    ACTIVE = 'Active',
    DISABLED = 'Disabled',
    LOST = 'Lost',
    STOLEN = 'Stolen',
    DAMAGED = 'Damaged',
    EXPIRED = 'Expired'
}

const DIVISION: string = envs.GALLAGHER_DIVISION_URL 
const VISITOR_AG: string = envs.GALLAGHER_VISITOR_AG_URL 
const STAFF_AG: string = envs.GALLAGHER_STAFF_AG_URL 
const QR_CODE_CARD_TYPE_URL: string = envs.GALLAGHER_QR_CODE_CARD_TYPE_URL

export class UserPermission {
    private readonly divisionUrl: string
    private readonly accessGroupUrl: string

    constructor(divisionUrl: string, accessGroupHref: string) {
        this.divisionUrl = divisionUrl;
        this.accessGroupUrl = accessGroupHref;
    }

    public getDivisionHref(): HrefMixin {
        return {
            href: this.divisionUrl
        }
    }

    public getAccessGroup(): AccessGroup {
        const now = moment()
        const fromTimeUTC = now.utc().format('YYYY-MM-DDTHH:mm:ssZ')
        const untilTimeUTC = now.endOf('day').utc().format('YYYY-MM-DDTHH:mm:ssZ')

        return {
            accessGroup: {
                href: this.accessGroupUrl
            },
            from: fromTimeUTC,
            until: untilTimeUTC
        } as AccessGroup
    }
}

export class CardEntity {
    private readonly cardNumber: string
    private readonly validityPeriodInMs: number
    private readonly fromInMs: number

    // from / until will be calculated
    private readonly untilInMs: number
    private readonly from: moment.Moment
    private readonly until: moment.Moment

    constructor(cardNumber?: string, fromInMs?: number, validityPeriodInMs?: number) {
        this.cardNumber = cardNumber || ''
        this.validityPeriodInMs = validityPeriodInMs ? validityPeriodInMs : 5 * 60 * 1000;
        this.fromInMs = fromInMs ? fromInMs : moment.now().valueOf()
        this.from = moment(this.fromInMs)
        this.untilInMs = moment(this.fromInMs).add(this.validityPeriodInMs, 'ms').valueOf()
        this.until = moment(this.untilInMs)
    }

    public toAddCardToCardholderRequest(): GallagherUpdateCardholderRequest {
        const addCardOperation: CardOperation = {
            add: [ this.getCard() ]
        }
        return { cards: addCardOperation }
    }

    public getCard(): Card {
        const fromTimeUTC = this.from.utc().format('YYYY-MM-DDTHH:mm:ssZ')
        const untilTimeUTC = this.until.utc().format('YYYY-MM-DDTHH:mm:ssZ')

        return {
            type: {
                href: QR_CODE_CARD_TYPE_URL
            },
            from: fromTimeUTC,
            until: untilTimeUTC,
            number: this.cardNumber,
            trace: true
        }
    }

    public expiredAtInMs(): number {
        return this.untilInMs
    }
}

export class CardholderEntity {

    private readonly userType?: UserType
    private readonly userName?: string
    private readonly floor?: string
    private authorise: boolean;

    private readonly cardEntity?: CardEntity

    constructor(userType?: UserType, userName?: string, floor?: string, authorise?: boolean, cardEntity?: CardEntity) {
        this.userType = userType
        this.userName = userName
        this.floor = floor
        this.authorise = authorise || true
        this.cardEntity = cardEntity
    }

    public toCreateCardholderRequest(): GallagherCreateCardholderRequest {
        const userPermission: UserPermission = this.getUserPermission()

        const division = userPermission.getDivisionHref()
        const accessGroup = userPermission.getAccessGroup()

        return this.cardEntity ? {
            firstName: this.userName,
            lastName: this.userName,
            shortName: this.userName,
            authorised: this.authorise,
            division: division,
            cards: [ this.cardEntity.getCard() ],
            accessGroups: [accessGroup]
        } : {
            firstName: this.userName,
            lastName: this.userName,
            shortName: this.userName,
            authorised: this.authorise,
            division: division,
            accessGroups: [accessGroup]
        }
    }

    public getCardEntity() {
        return this.cardEntity
    }

    private getUserPermission(): UserPermission {
        switch (this.userType) {
            case UserType.VISITOR:
                return new UserPermission(DIVISION, VISITOR_AG);
            case UserType.STAFF:
                return new UserPermission(DIVISION, STAFF_AG);
            case UserType.VIP:
                return new UserPermission(DIVISION, VISITOR_AG);
            default:
                return new UserPermission(DIVISION, VISITOR_AG)
        }
    }

}