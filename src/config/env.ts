import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    API_PREFIX: get('API_PREFIX').default('/api').asString(),
    NODE_ENV: get('NODE_ENV').default('development').asString(),

    GALLAGHER_API_URL: get('GALLAGHER_API_URL').required().asString(),
    GALLAGHER_API_KEY: get('GALLAGHER_API_KEY').required().asString(),
    GALLAGHER_DIVISION_URL: get('GALLAGHER_DIVISION_URL').required().asString(),
    GALLAGHER_ONE_IN_ONE_OUT_AG_URL: get('GALLAGHER_ONE_IN_ONE_OUT_AG_URL').required().asString(),
    GALLAGHER_UNLIMITED_IN_OUT_AG_URL: get('GALLAGHER_UNLIMITED_IN_OUT_AG_URL').required().asString(),
    GALLAGHER_QR_CODE_CARD_TYPE_URL: get('GALLAGHER_QR_CODE_CARD_TYPE_URL').required().asString(),

    MONGODB_CONNECTION_STR: get('MONGODB_CONNECTION_STR').required().asString(),

    SMTP_SERVER_HOST: get('SMTP_SERVER_HOST').asString(),
    SMTP_SERVER_PORT: get('SMTP_SERVER_PORT').asPortNumber(),
    SMTP_SERVER_USERNAME: get('SMTP_SERVER_USERNAME').asString(),
    SMTP_SERVER_PASSWORD: get('SMTP_SERVER_PASSWORD').asString()
};