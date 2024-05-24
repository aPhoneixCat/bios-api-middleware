
export enum UserType {
    VISITOR,
    STAFF,
    VIP
}

export enum UserPermission {
    ONE_IN_ONE_OUT,
    UNLIMITED_IN_OUT
}

export const getAccessGroupByUserType = (userType: UserType): string => {
    switch (userType) {
        case UserType.VISITOR:
            return '';
        case UserType.STAFF:
            return '';
        case UserType.VIP:
            return '';
        default:
            return ''
    }
}