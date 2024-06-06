import { type Response, type NextFunction, type Request } from 'express';

import { ValidationError } from '../errors/validation.error';
import { HttpCode } from '../constants';
import { AppError } from '../errors/custom.error';
import { ErrResponse } from '../domain/dtos/utils';

export class ErrorMiddleware {
    //* Dependency injection
    // constructor() {}

    public static handleError = (error: unknown, _: Request, res: Response, next: NextFunction): void => {
        if (error instanceof ValidationError) {
            const { message, name, validationErrors, stack } = error;
            const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
            res.statusCode = statusCode;
            res.json(ErrResponse(message, { name, validationErrors, stack }))
        }
        if (error instanceof AppError) {
            const { message, name, stack } = error;
            const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
            res.statusCode = statusCode;
            res.json(ErrResponse(message, { name, stack }));
        }
        next();
    };
}