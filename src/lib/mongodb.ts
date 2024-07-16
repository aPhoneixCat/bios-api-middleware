import mongoose, { ConnectOptions } from "mongoose";
import { envs } from "../config/env";
import Logger from "./logger";

const connect = mongoose.connection;
mongoose.set('strictQuery', true)

const connectMongoDB = async () => {
    connect.on('connected', async () => {
        Logger.info('MongoDb Connection Established')
    })
    connect.on('reconnected', async () => {
        Logger.info('MongoDB Connection Reestablished')
    })
    connect.on('disconnected', () => {
        Logger.info('MongoDB Connection Disconnected')
        Logger.info('Trying to reconnect to Mongo...')

        setTimeout(() => {
            mongoose.connect(envs.MONGODB_CONNECTION_STR, {
                dbName: envs.MONGODB_DATABASE,
                useNewurlParser: true,
                useUnifiedTopology: true,
                keepAlive: true,
                socketTimeoutMS: 3000,
                connectTimeoutMS: 3000
            } as ConnectOptions)
        }, 3000)
    })
    connect.on('close', () => {
        Logger.info('Mongo Connection Closed')
    });
    connect.on('error', (error) => {
        Logger.error('Mongo Connection Error: ' + error)
    })
    await mongoose.connect(envs.MONGODB_CONNECTION_STR,
        {
            useNewurlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions
    ).catch((error) => Logger.error(error))
}

export { connectMongoDB }