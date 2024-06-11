import mongoose, { ConnectOptions } from "mongoose";
import { envs } from "../config/env";

const connect = mongoose.connection;
mongoose.set('strictQuery', true)

const connectMongoDB = async () => {
    const url = envs.MONGODB_CONNECTION_STR

    connect.on('connected', async () => {
        console.log('MongoDb Connection Established')
    })
    connect.on('reconnected', async () => {
        console.log('MongoDB Connection Reestablished')
    })
    connect.on('disconnected', () => {
        console.log('MongoDB Connection Disconnected')
        console.log('Trying to reconnect to Mongo...')


        setTimeout(() => {
            mongoose.connect(url, {
                useNewurlParser: true,
                useUnifiedTopology: true,
                keepAlive: true,
                socketTimeoutMS: 3000,
                connectTimeoutMS: 3000
            } as ConnectOptions)
        }, 3000)
    })
    connect.on('close', () => {
        console.log('Mongo Connection Closed')
    });
    connect.on('error', (error) => {
        console.log('Mongo Connection Error: ' + error)
    })
    await mongoose.connect(url,
        {
            useNewurlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions
    ).catch((error) => console.log(error))
}

module.exports = { connectMongoDB }