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

export interface IResponse {
    success: boolean,
    message: string,
    data?: any,
    error?: any
}

export const SuccessResponse = (message: string, data?: any) => {
    return {
        success: true,
        message: message,
        data: data
    }
}

export const ErrResponse = (errMsg: string, error?: any) => {
    return {
        success: false,
        message: errMsg,
        error: error
    }
}
