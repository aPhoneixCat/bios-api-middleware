import moment from "moment";

import { AccessGroup, Card, CardOperation, GallagherCreateCardholderRequest, GallagherUpdateCardholderRequest } from "../dtos/gallagher/cardholder";
import { HrefMixin } from "../dtos/utils";
import { envs } from "../../config/env";

// Visitor, vip, staff, shall have different division, access group
export enum UserType {
    VISITOR = "visitor",
    STAFF = "staff",
    VIP = "vip"
}

const DIVISION: string = envs.GALLAGHER_DIVISION_URL 
const ONE_IN_ONE_OUT_AG: string = envs.GALLAGHER_ONE_IN_ONE_OUT_AG_URL 
const UNLIMITED_IN_OUT_AG: string = envs.GALLAGHER_UNLIMITED_IN_OUT_AG_URL 
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
        return {
            accessGroup: {
                href: this.accessGroupUrl
            }
        }
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
            number: this.cardNumber
        }
    }

    public expiredAtInMs(): number {
        return this.untilInMs
    }
}

export class CardholderEntity {

    private readonly userType?: UserType
    private readonly userName?: string
    private authorise: boolean;

    private readonly cardEntity?: CardEntity

    constructor(userType?: UserType, userName?: string, authorise?: boolean, cardEntity?: CardEntity) {
        this.userType = userType;
        this.userName = userName;
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
                return new UserPermission(DIVISION, ONE_IN_ONE_OUT_AG);
            case UserType.STAFF:
                return new UserPermission(DIVISION, UNLIMITED_IN_OUT_AG);
            case UserType.VIP:
                return new UserPermission(DIVISION, UNLIMITED_IN_OUT_AG);
            default:
                return new UserPermission(DIVISION, ONE_IN_ONE_OUT_AG)
        }
    }

}