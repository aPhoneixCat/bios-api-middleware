module.exports = {
    apps: [
        {
            name: "B-IOS",
            script: "dist/app.js",
            env_development: {
                NODE_ENV: "development",
                PORT: 3005,
                API_PREFIX: "/api",
                GALLAGHER_API_URL: 'https://10.201.2.100:8904/',
                GALLAGHER_API_KEY: '42B0-0869-0723-3F8A-C59D-5A6D-4CA7-726F',
                GALLAGHER_DIVISION_URL: 'https://10.201.2.100:8904/api/divisions/2',
                GALLAGHER_VISITOR_AG_URL: 'https://10.201.2.100:8904/api/access_groups/1295',
                GALLAGHER_STAFF_AG_URL: 'https://10.201.2.100:8904/api/access_groups/1175',
                GALLAGHER_QR_CODE_CARD_TYPE_URL: 'https://10.201.2.100:8904/api/card_types/599',
                MONGODB_CONNECTION_STR: 'mongodb://192.168.131.161:27017',
                MONGODB_DATABASE: 'bios',
                SMTP_SERVER_HOST: 'smtp.office365.com',
                SMTP_SERVER_PORT: 587,
                SMTP_SERVER_USERNAME: 'tbd',
                SMTP_SERVER_PASSWORD: 'tbd'
            },
            env_production: {
                NODE_ENV: "production",
                PORT: 3005,
                API_PREFIX: "/api",
                GALLAGHER_API_URL: 'https://10.201.2.100:8904/',
                GALLAGHER_API_KEY: '42B0-0869-0723-3F8A-C59D-5A6D-4CA7-726F',
                GALLAGHER_DIVISION_URL: 'https://10.201.2.100:8904/api/divisions/2',
                GALLAGHER_VISITOR_AG_URL: 'https://10.201.2.1008904/api/access_groups/1295',
                GALLAGHER_STAFF_AG_URL: 'https://10.201.2.100:8904/api/access_groups/1175',
                GALLAGHER_QR_CODE_CARD_TYPE_URL: 'https://10.201.2.100:8904/api/card_types/599',
                MONGODB_CONNECTION_STR: 'mongodb://192.168.131.161:27017',
                MONGODB_DATABASE: 'bios',
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
                NODE_ENV: "development",
                JOB_TYPES: "cardholder-event"
            },
            env_production: {
                NODE_ENV: "production",
                JOB_TYPES: "cardholder-event"
            }
        }
    ]
}


