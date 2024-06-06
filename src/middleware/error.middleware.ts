import { type Response, type NextFunction, type Request } from 'express';

import { ValidationError } from '../errors/validation.error';
import { HttpCode } from '../constants';
import { AppError } from '../errors/custom.error';
import { ErrResponse } from '../domain/dtos/utils';
import Logger from '../lib/logger';

export class ErrorMiddleware {
    
    public static handleError = (error: unknown, _: Request, res: Response, next: NextFunction): void => {
        if (error instanceof ValidationError) {
            const { message, name, validationErrors, stack } = error;

            Logger.error(`Request error: ${JSON.stringify({
                name, message, validationErrors, stack
            })}`)
            const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
            res.statusCode = statusCode;
            res.json(ErrResponse({
                name,
                message,
                validationErrors: validationErrors
            }))
        }

        if (error instanceof AppError) {
            const { message, name, stack } = error;
            Logger.error(`Request error: ${JSON.stringify({
                name, message, stack
            })}`)
            const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
            res.statusCode = statusCode;
            res.json(ErrResponse({
                name,
                message
            }));
        }
        next();
    };
}