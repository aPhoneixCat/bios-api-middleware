import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    API_PREFIX: get('API_PREFIX').default('/api').asString(),
    NODE_ENV: get('NODE_ENV').default('development').asString(),

    GALLAGHER_API_URL: get('GALLAGHER_API_URL').required().asString(),
    GALLAGHER_API_KEY: get('GALLAGHER_API_KEY').required().asString(),
    GALLAGHER_DIVISION_URL: get('GALLAGHER_DIVISION_URL').required().asString(),
    GALLAGHER_VISITOR_AG_URL: get('GALLAGHER_VISITOR_AG_URL').required().asString(),
    GALLAGHER_VIP_AG_URL: get('GALLAGHER_VIP_AG_URL').required().asString(),
    GALLAGHER_STAFF_AG_URL: get('GALLAGHER_STAFF_AG_URL').required().asString(),
    GALLAGHER_QR_CODE_CARD_TYPE_URL: get('GALLAGHER_QR_CODE_CARD_TYPE_URL').required().asString(),
    GALLAGHER_VISITOR_COMPETENCY: get('GALLAGHER_VISITOR_COMPETENCY').required().asString(),

    RUCKUS_API_URL: get('RUCKUS_API_URL').required().asString(),
    RUCKUS_USERNAME: get('RUCKUS_USERNAME').required().asString(),
    RUCKUS_PASSWORD: get('RUCKUS_PASSWORD').required().asString(),

    MONGODB_CONNECTION_STR: get('MONGODB_CONNECTION_STR').required().asString(),
    MONGODB_CONNECTION_STR_DR: get('MONGODB_CONNECTION_STR_DR').required().asString(),
    MONGODB_DATABASE: get('MONGODB_DATABASE').required().asString(),

    SMTP_SERVER_HOST: get('SMTP_SERVER_HOST').asString(),
    SMTP_SERVER_PORT: get('SMTP_SERVER_PORT').asPortNumber(),
    SMTP_SERVER_USERNAME: get('SMTP_SERVER_USERNAME').asString(),
    SMTP_SERVER_PASSWORD: get('SMTP_SERVER_PASSWORD').asString()
};