import moment from "moment";

import { AccessGroup, Card, GallagherCreateCardholderRequest } from "../dtos/gallagher/cardholder";
import { HrefMixin } from "../dtos/utils";

// Visitor, vip, staff, shall have different division, access group
export enum UserType {
    VISITOR = "visitor",
    STAFF = "staff",
    VIP = "vip"
}

const DIVISION: string = ''
const ONE_IN_ONE_OUT_AG: string = ''
const UNLIMITED_IN_OUT_AG: string = ''
const CARD_TYPE_URL: string = 'https://10.6.79.89:8904/api/card_types/606'

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

export class CardholderEntity {

    private readonly userType: UserType
    private readonly userName: string
    private readonly cardNumber: string
    private readonly validityPeriodInMs: number
    private readonly fromInMs: number
    private readonly untilInMs: number
    private readonly from: moment.Moment
    private readonly until: moment.Moment

    constructor(userType: UserType,
        userName: string,
        cardNumber: string,
        validityPeriodInMs?: number,
        fromInMs?: number
    ) {
        this.userType = userType;
        this.userName = userName;
        this.cardNumber = cardNumber;

        this.validityPeriodInMs = validityPeriodInMs ? validityPeriodInMs : 5 * 60 * 1000;
        this.fromInMs = fromInMs ? fromInMs : moment.now().valueOf()
        this.from = moment(this.fromInMs)
        this.untilInMs = moment(this.fromInMs).add(this.validityPeriodInMs, 'ms').valueOf()
        this.until = moment(this.untilInMs)
    }

    public toCreateCardholderRequest(): GallagherCreateCardholderRequest {
        const userPermission: UserPermission = this.getUserPermission()

        const division = userPermission.getDivisionHref()
        const accessGroup = userPermission.getAccessGroup()
        const card: Card = this.getCard()

        return {
            shortName: this.userName,
            authorised: true,
            division: division,
            cards: [card],
            accessGroups: [accessGroup]
        }
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

    private getCard(): Card {
        const fromTimeUTC = this.from.utc().format('YYYY-MM-DDTHH:mm:ssZ')
        const untilTimeUTC = this.until.utc().format('YYYY-MM-DDTHH:mm:ssZ')

        return {
            type: {
                href: CARD_TYPE_URL
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