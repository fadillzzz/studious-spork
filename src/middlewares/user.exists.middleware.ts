import { NextFunction, Request, Response } from "express";
import { getUserService } from "../services/registry";

export async function userExistsMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const value = req.params.id;
    const userService = getUserService();

    if (!(await userService.exists(value))) {
        return res.status(404).json({
            error: "User does not exist",
        });
    }

    next();
}
