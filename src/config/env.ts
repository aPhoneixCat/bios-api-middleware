import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    API_PREFIX: get('API_PREFIX').default('/api').asString(),
    NODE_ENV: get('NODE_ENV').default('development').asString(),
    GALLAGHER_API_URL: get('GALLAGHER_API_URL').required().asString(),
    GALLAGHER_API_KEY: get('GALLAGHER_API_KEY').required().asString(),
    QR_CODE_SERVER_URL: get('QR_CODE_SERVER_URL').required().asString(),
    MONGODB_CONNECTION_STR: get('MONGODB_CONNECTION_STR').required().asString()
};