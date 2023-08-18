import { NextFunction, Request, Response } from "express";

/**
 * This middleware will check if the given user ID param matches
 * the authenticated user.
 * This can only be used in conjunction with authMiddleware
 * and UserGetValidator because it makes assumptions that all
 * the necessary input exist and are valid.
 */
export function userOwnerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (req.user) {
        if (req.user.id === req.params.id) {
            return next();
        } else {
            return res.status(403).json({
                error: "You're not allowed to access this resource",
            });
        }
    }

    return res.status(401).json({
        error: "Unauthorized",
    });
}
