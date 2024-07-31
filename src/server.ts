// src/server.ts
import { type Server as ServerHttp, type IncomingMessage, type ServerResponse } from 'http';
import express, { type NextFunction, type Request, type Response } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import swaggerUi from "swagger-ui-express"
import { ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './constants';
import { ErrorMiddleware } from './middleware/error.middleware'
import morganMiddleware from './middleware/morgan.middlreware';
import { TraceMiddleware } from './middleware/trace.middleware';
import { AppError } from './errors/custom.error'
import Logger from "./lib/logger";
import { CorsMiddleware } from './middleware/cors.middleware';
import { RegisterRoutes } from "./routes";
import { mailTo } from './lib/mail_server';

// ########################################################################
// controllers need to be referenced in order to get crawled by the generator
// when adding new controller, add the import here so that it can be indexed.
import { ACSController } from './controllers/acs.controller';
import { EventController } from './controllers/events.controller';
import { RuckusController } from './controllers/ruckus.controller';
// ########################################################################

interface ServerOptions {
    port: number;
    apiPrefix: string;
}

export class Server {
    private readonly app = express();
    private serverListener?: ServerHttp<typeof IncomingMessage, typeof ServerResponse>;
    private readonly port: number;

    constructor(options: ServerOptions) {
        const { port } = options;
        this.port = port;
    }

    async start(): Promise<void> {
        //* Middlewares
        this.app.use(express.json()); // parse json in request body (allow raw)
        this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded
        this.app.use(compression());
        this.app.use(morganMiddleware);
        this.app.use(express.static("public"));
        this.app.use(CorsMiddleware.handleCors)
        // limit repeated requests to public APIs
        this.app.use(rateLimit({
            max: ONE_HUNDRED * ONE_THOUSAND,
            windowMs: SIXTY * SIXTY * ONE_THOUSAND,
            message: 'Too many requests from this IP, please try again in one hour'
        }));
        this.app.use(require('express-status-monitor')());
        this.app.use(TraceMiddleware.handleTrace)

        // Swagger API
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(undefined, {
            explorer: false,
            swaggerOptions: {
                url: "/swagger.json",
                validatorUrl: null
            }
        }))

        RegisterRoutes(this.app);

        //* Handle not found routes
        this.app.all('*', (req: Request, _: Response, next: NextFunction): void => {
            next(AppError.notFound(`Cant find ${req.originalUrl} on this server!`));
        });
        // Handle errors middleware for the routes
        this.app.use(ErrorMiddleware.handleError);

        this.serverListener = this.app.listen(this.port, () => {
            Logger.info(`✓ Server running; Check status on http://localhost:${this.port}/status`);
            Logger.info(`✓ Started Swagger UI at http://localhost:${this.port}/api-docs`)
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
