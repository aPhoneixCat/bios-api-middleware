import { HrefMixin, IdentityMixin } from "../utils";
import { DivisionRef, Next } from "./reference";

/**
 * https://gallaghersecurity.github.io/cc-rest-docs/ref/events.html#/definitions/Item%20summary
 */
export interface ItemSummary extends IdentityMixin {
    name: string,
    type: ItemType,
    serverDisaplyName: string,
    notes: string,
    href: string
}

export interface ItemDetail extends ItemSummary {
    division: DivisionRef
}

export interface ItemType extends IdentityMixin {
    name: string,
    canonicalTypeName: string
}

// Item related response

/**
 * Item Search Response
 * 
 */
export interface ItemSearchResponse {
    results: ItemSummary[],

    next: Next
}

export type ItemDetailResponse = ItemDetail

export interface ItemTypeListResponse {
    itemTypes: ItemType[]
}