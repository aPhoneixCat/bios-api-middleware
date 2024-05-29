import { type Response, type NextFunction, type Request } from 'express';

export class CorsMiddleware {
    //* Dependency injection
    // constructor() {}

    public static handleCors = (req: Request, res: Response, next: NextFunction): void => {
        // Add your origins
        const allowedOrigins = ['http://localhost:3000'];
        const origin = req.headers.origin;
        // TODO: Fix this
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (allowedOrigins.includes(origin!)) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            res.setHeader('Access-Control-Allow-Origin', origin!);
        }
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        next();
    };
}