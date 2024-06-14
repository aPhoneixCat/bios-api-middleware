module.exports = {
    apps: [
        {
            name: "B-IOS",
            script: "dist/app.js",
            env_development: {
                NODE_ENV: "development",
                PORT: 3000,
                API_PREFIX: "/api",
                GALLAGHER_API_URL: 'https://192.168.16.195:8904/',
                GALLAGHER_API_KEY: '8130-DFCF-B396-34D7-65AA-F98A-ACA4-B4D1',
                GALLAGHER_DIVISION_URL: 'https://192.168.16.195:8904/api/divisions/2',
                GALLAGHER_ONE_IN_ONE_OUT_AG_URL: 'https://192.168.16.195:8904/api/access_groups/611',
                GALLAGHER_UNLIMITED_IN_OUT_AG_URL: 'https://192.168.16.195:8904/api/access_groups/611',
                GALLAGHER_QR_CODE_CARD_TYPE_URL: 'https://192.168.16.195:8904/api/card_types/601',
                MONGODB_CONNECTION_STR: 'mongodb://192.168.18.133:27017/',
                SMTP_SERVER_HOST: 'smtp.office365.com',
                SMTP_SERVER_PORT: 587,
                SMTP_SERVER_USERNAME: 'tbd',
                SMTP_SERVER_PASSWORD: 'tbd'
            },
            env_production: {
                NODE_ENV: "production",
                PORT: 3000,
                API_PREFIX: "/api",
                GALLAGHER_API_URL: 'https://tbd:8904/',
                GALLAGHER_API_KEY: 'XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX',
                GALLAGHER_DIVISION_URL: 'https://tbd/api/divisions/2',
                GALLAGHER_ONE_IN_ONE_OUT_AG_URL: 'https://tbb:8904/api/access_groups/611',
                GALLAGHER_UNLIMITED_IN_OUT_AG_URL: 'https://tbd:8904/api/access_groups/611',
                GALLAGHER_QR_CODE_CARD_TYPE_URL: 'https://tbd:8904/api/card_types/601',
                MONGODB_CONNECTION_STR: 'mongodb://tbd:27017/',
                SMTP_SERVER_HOST: 'smtp.office365.com',
                SMTP_SERVER_PORT: 587,
                SMTP_SERVER_USERNAME: 'tbd',
                SMTP_SERVER_PASSWORD: 'tbd'
            }
        },
        {
            name: "B-IOS-event-bot",
            scrip: "tbd",
            env_development: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
}


