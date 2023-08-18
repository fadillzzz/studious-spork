import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

/**
 * Middleware for handling validation errors and returning the errors as a response
 */
export function errorResponseMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }

    return next();
}
