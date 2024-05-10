import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    API_PREFIX: get('API_PREFIX').default('/api').asString(),
    NODE_ENV: get('NODE_ENV').default('development').asString(),
    ACS_URL: get('ACS_URL').required().asString(),
    QR_CODE_SERVER_URL: get('QR_CODE_SERVER_URL').required().asString()
};