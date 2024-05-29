// src/server.ts
import { type Server as ServerHttp, type IncomingMessage, type ServerResponse } from 'http';
import express, { type NextFunction, type Router, type Request, type Response } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan'
import swaggerUi from "swagger-ui-express"

import { HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './constants';
import { ErrorMiddleware } from './middleware/error.middleware'
import morganMiddleware from './middleware/morgan.middlreware';
import { AppError } from './errors/custom.error'
import Logger from "./lib/logger";
import { CorsMiddleware } from './middleware/cors.middleware';
import { RegisterRoutes } from "./routes";

import { ACSController } from './controllers/acs.controller';
import { EventController } from './controllers/events.controller';
import { WIFIController } from './controllers/wifi.controller';

interface ServerOptions {
    port: number;
    apiPrefix: string;
    //routes: Router;
}

export class Server {
    private readonly app = express();
    private serverListener?: ServerHttp<typeof IncomingMessage, typeof ServerResponse>;
    private readonly port: number;
    // private readonly routes: Router;
    //private readonly apiPrefix: string;

    constructor(options: ServerOptions) {
        const { port } = options;
        this.port = port;
        //this.apiPrefix = apiPrefix;
    }

    async start(): Promise<void> {
        //* Middlewares
        this.app.use(express.json()); // parse json in request body (allow raw)
        this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded
        this.app.use(compression());
        this.app.use(morgan('tiny'));
        this.app.use(morganMiddleware);
        this.app.use(express.static("public"));
        // limit repeated requests to public APIs
        this.app.use(
            rateLimit({
                max: ONE_HUNDRED,
                windowMs: SIXTY * SIXTY * ONE_THOUSAND,
                message: 'Too many requests from this IP, please try again in one hour'
            })
        );
        // CORS
        this.app.use(CorsMiddleware.handleCors)

        // Swagger API
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(undefined, {
            explorer: false,
            swaggerOptions: {
                url: "/swagger.json",
                validatorUrl: null
            }
        }))

        //* Routes
        RegisterRoutes(this.app);

        // Handle errors middleware for the routes
        this.app._router.use(ErrorMiddleware.handleError);

        //* Handle not found routes
        this.app._router.all('*', (req: Request, _: Response, next: NextFunction): void => {
            next(AppError.notFound(`Cant find ${req.originalUrl} on this server!`));
        });

        this.serverListener = this.app.listen(this.port, () => {
            Logger.info(`✓ Server running on port http://localhost:${this.port}`);
            Logger.info(`✓ Started Swagger UI at http://localhost:${this.port}/docs`)
        });

        // for a graceful shutdown: https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
        process.on('SIGTERM', () => {
            Logger.debug('SIGTERM signal received: closing HTTP server')
            this.close()
        })
    }

    close(): void {
        this.serverListener?.close(() => {
            Logger.debug('HTTP server closed')
        });
    }
}
