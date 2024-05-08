// src/server.ts

import express, { type NextFunction, type Router, type Request, type Response } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan'
import swaggerUi from "swagger-ui-express"

import { HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './constants';
import { ErrorMiddleware } from './middleware/error.middleware'
import { AppError } from './errors/custom.error'

interface ServerOptions {
    port: number;
    apiPrefix: string;
    routes: Router;
}

export class Server {
    private readonly app = express();
    private readonly port: number;
    private readonly routes: Router;
    private readonly apiPrefix: string;

    constructor(options: ServerOptions) {
        const { port, routes, apiPrefix } = options;
        this.port = port;
        this.routes = routes;
        this.apiPrefix = apiPrefix;
    }

    async start(): Promise<void> {
        //* Middlewares
        this.app.use(express.json()); // parse json in request body (allow raw)
        this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded
        this.app.use(compression());
        this.app.use(morgan('tiny'))
        this.app.use(express.static("public"));
        // limit repeated requests to public APIs
        this.app.use(
            rateLimit({
                max: ONE_HUNDRED,
                windowMs: SIXTY * SIXTY * ONE_THOUSAND,
                message: 'Too many requests from this IP, please try again in one hour'
            })
        );

        // Test rest api
        this.app.get('/', (_req: Request, res: Response) => {
            return res.status(HttpCode.OK).send({
                message: `Welcome to B-IOS API! Endpoints available at http://localhost:${this.port}${this.apiPrefix}`
            });
        });

        //* Routes
        this.app.use(this.apiPrefix, this.routes)

        // Swagger API
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(undefined, {
            explorer: true,
            swaggerOptions: {
                url: "/swagger.json"
            }
        }))

        //* Handle not found routes in /api/v1/* (only if 'Public content folder' is not available)
        this.routes.all('*', (req: Request, _: Response, next: NextFunction): void => {
            next(AppError.notFound(`Cant find ${req.originalUrl} on this server!`));
        });

        // Handle errors middleware
        this.routes.use(ErrorMiddleware.handleError);

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}...`);
        });
    }
}