export function toLowerCamel(name: string): string {
    const upper = name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    return upper.charAt(0).toLowerCase() + upper.slice(1);
}

export interface IdentityMixin {
    id: string;
}

export interface HrefMixin {
    href: string;
}

export interface OptionalHref {
    href?: string;
}

export interface SuccessResponse<T> {
    success: boolean,
    message: string,
    data: T
}

export interface ErrorResponse {
    success: boolean,
    message: string,
    error: Error
}
