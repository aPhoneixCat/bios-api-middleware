import moment from "moment";

import { AccessGroup, Card, CardOperation, Competency, GallagherCreateCardholderRequest, GallagherUpdateCardholderRequest } from "../dtos/gallagher/cardholder";
import { HrefMixin } from "../dtos/utils";
import { envs } from "../../config/env";
import { Floor, Room } from "../../config/floors";
import Logger from "../../lib/logger";

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
const VIP_AG: string = envs.GALLAGHER_VIP_AG_URL 
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

    public getAccessGroup(expiryAtInMs: number | undefined): AccessGroup {
        const timeFormat = 'YYYY-MM-DDTHH:mm:ssZ'
        const now = moment()
        const fromTimeUTC = now.utc().format(timeFormat)
        const untilTimeUTC = expiryAtInMs
            ? moment(expiryAtInMs).utc().format(timeFormat)
            : now.endOf('day').utc().format(timeFormat)
        Logger.info('untilTimeUTC = ', untilTimeUTC)
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
    private readonly userExpiryAtInMs?: number
    private authorise: boolean;

    private readonly cardEntity?: CardEntity

    constructor(
        userType?: UserType, 
        userName?: string, 
        floor?: string, 
        userExpiryAtInMs?: number,
        authorise?: boolean,
        cardEntity?: CardEntity
    ) {
        this.userType = userType
        this.userName = userName
        this.floor = floor
        this.userExpiryAtInMs = userExpiryAtInMs
        this.authorise = authorise ?? true
        this.cardEntity = cardEntity
    }

    public toCreateCardholderRequest(): GallagherCreateCardholderRequest {
        const userPermission: UserPermission = this.getUserPermission()
        const competency: Competency | undefined = this.getCompetency()

        const division = userPermission.getDivisionHref()
        const accessGroup = userPermission.getAccessGroup(this.userExpiryAtInMs)

        return this.cardEntity ? {
            firstName: this.userName?.substring(0, 50), // first name is only allowed 50 characters
            lastName: this.userName?.substring(0, 50), // // last name is only allowed 50 characters
            shortName: this.userName?.substring(0, 16), // short name is only allowed 16 characters
            description: this.userType ?? '', // description only allow 200 characters
            authorised: this.authorise,
            division: division,
            cards: [ this.cardEntity.getCard() ],
            accessGroups: [accessGroup],
            competencies: competency ? [ competency ] : undefined
        } : {
            firstName: this.userName,
            lastName: this.userName,
            shortName: this.userName,
            description: this.userType ?? '',
            authorised: this.authorise,
            division: division,
            accessGroups: [accessGroup],
            competencies: competency ? [ competency ] : undefined
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
                return new UserPermission(DIVISION, VIP_AG);
            default:
                return new UserPermission(DIVISION, VISITOR_AG)
        }
    }

    private getCompetency(): Competency | undefined {
        if (this.userType == UserType.VISITOR) {
            return {
                competency: {
                    href: envs.GALLAGHER_VISITOR_COMPETENCY
                },
                enabled: true
            }
        }
    }

}