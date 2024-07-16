import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file';
import 'winston-mongodb'
import { MongoDBConnectionOptions } from 'winston-mongodb';
import { envs } from "../config/env";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}


const level = () => {
    const isDevelopment = envs.NODE_ENV === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

const mongoLogOptions: MongoDBConnectionOptions = {
    db: envs.MONGODB_CONNECTION_STR,
    dbName: envs.MONGODB_DATABASE,
    options: { useUnifiedTopology: true},
    collection: 'logs',
    capped: false,
    expireAfterSeconds: 2592000,
    leaveConnectionOpen: false,
    storeHost: false,
    metaKey: 'additionInfo'
}

const dr_mongoLogOptions: MongoDBConnectionOptions = {
    ...mongoLogOptions,
    db: envs.MONGODB_CONNECTION_STR_DR,
}

winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

const allFileTransport: DailyRotateFile = new DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const errorFilleTransport: DailyRotateFile = new DailyRotateFile({
    level: 'error',
    filename: 'logs/application-error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const transports = [
    new winston.transports.Console(),
    errorFilleTransport,
    allFileTransport,
    new winston.transports.MongoDB(mongoLogOptions),
    new winston.transports.MongoDB(dr_mongoLogOptions)
]

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})

export default Logger