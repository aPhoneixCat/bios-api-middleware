module.exports = {
    apps: [
        {
            name: "B-IOS",
            script: "dist/app.js",
            env_development: { // UAT
                NODE_ENV: "development",
                PORT: 3005,
                API_PREFIX: "/api",
                GALLAGHER_API_URL: 'https://10.201.2.100:8904/',
                GALLAGHER_API_KEY: '42B0-0869-0723-3F8A-C59D-5A6D-4CA7-726F',
                GALLAGHER_DIVISION_URL: 'https://10.201.2.100:8904/api/divisions/2',
                GALLAGHER_VISITOR_AG_URL: 'https://10.201.2.100:8904/api/access_groups/1295',
                GALLAGHER_VIP_AG_URL: 'https://10.201.2.100:8904/api/access_groups/4499',
                GALLAGHER_STAFF_AG_URL: 'https://10.201.2.100:8904/api/access_groups/1175',
                GALLAGHER_QR_CODE_CARD_TYPE_URL: 'https://10.201.2.100:8904/api/card_types/599',
                GALLAGHER_VISITOR_COMPETENCY: 'https://10.201.2.100:8904/api/competencies/2379',
                RUCKUS_API_URL:'htps://xxxx:xxx',
                RUCKUS_USERNAME:'xxx',
                RUCKUS_PASSWORD:'xxx',
                MONGODB_CONNECTION_STR: 'mongodb://bios:xxxxx@192.168.131.161:27017/bios',
                MONGODB_CONNECTION_STR_DR: 'mongodb://bios:xxxxx@192.168.131.161:27017/bios',
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
                GALLAGHER_VISITOR_AG_URL: 'https://10.201.2.100:8904/api/access_groups/1295',
                GALLAGHER_VIP_AG_URL: 'https://10.201.2.100:8904/api/access_groups/4499',
                GALLAGHER_STAFF_AG_URL: 'https://10.201.2.100:8904/api/access_groups/1175',
                GALLAGHER_QR_CODE_CARD_TYPE_URL: 'https://10.201.2.100:8904/api/card_types/599',
                GALLAGHER_VISITOR_COMPETENCY: 'https://10.201.2.100:8904/api/competencies/2379',
                RUCKUS_API_URL:'htps://xxxx:xxx',
                RUCKUS_USERNAME:'xxx',
                RUCKUS_PASSWORD:'xxx',
                MONGODB_CONNECTION_STR: 'mongodb://bios:xxxxx@192.168.41.65:27017/bios',
                MONGODB_CONNECTION_STR_DR: 'mongodb://bios:xxxxx@192.168.131.65:27017/bios',
                MONGODB_DATABASE: 'bios',
                SMTP_SERVER_HOST: 'smtp.office365.com',
                SMTP_SERVER_PORT: 587,
                SMTP_SERVER_USERNAME: 'tbd',
                SMTP_SERVER_PASSWORD: 'tbd'
            },
            env_dr: {
                NODE_ENV: "production",
                PORT: 3005,
                API_PREFIX: "/api",
                GALLAGHER_API_URL: 'https://10.201.2.100:8904/',
                GALLAGHER_API_KEY: '42B0-0869-0723-3F8A-C59D-5A6D-4CA7-726F',
                GALLAGHER_DIVISION_URL: 'https://10.201.2.100:8904/api/divisions/2',
                GALLAGHER_VISITOR_AG_URL: 'https://10.201.2.100:8904/api/access_groups/1295',
                GALLAGHER_VIP_AG_URL: 'https://10.201.2.100:8904/api/access_groups/4499',
                GALLAGHER_STAFF_AG_URL: 'https://10.201.2.100:8904/api/access_groups/1175',
                GALLAGHER_QR_CODE_CARD_TYPE_URL: 'https://10.201.2.100:8904/api/card_types/599',
                GALLAGHER_VISITOR_COMPETENCY: 'https://10.201.2.100:8904/api/competencies/2379',
                RUCKUS_API_URL:'htps://xxxx:xxx',
                RUCKUS_USERNAME:'xxx',
                RUCKUS_PASSWORD:'xxx',
                MONGODB_CONNECTION_STR: 'mongodb://bios:xxxxx@192.168.131.65:27017/bios',
                MONGODB_CONNECTION_STR_DR: 'mongodb://bios:xxxxx@192.168.41.65:27017/bios',
                MONGODB_DATABASE: 'bios',
                SMTP_SERVER_HOST: 'smtp.office365.com',
                SMTP_SERVER_PORT: 587,
                SMTP_SERVER_USERNAME: 'tbd',
                SMTP_SERVER_PASSWORD: 'tbd'
            }
        },
        {
            name: "B-IOS-event-bot",
            scrip: "./dist/jobs/worker.js",
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


