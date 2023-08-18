import { getAuthService, getUserService } from "../services/registry";
import { NextFunction, Request, Response } from "express";

/**
 * Middleware to validate the JWT and also the existence of the user
 */
export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    // Disables this middleware in test environment to make testing easier
    if (process.env.NODE_ENV === "test") {
        return next();
    }

    const value = req.headers["authorization"] || "";

    try {
        if (!value.startsWith("Bearer ")) {
            throw new Error("Invalid token");
        }

        const token = value.split(" ")[1];
        const authService = getAuthService();
        const user = await authService.verify(token);

        if (!user) {
            throw new Error("Invalid token");
        }

        const userService = getUserService();

        // Verify the user still exists in the database
        if (!(await userService.exists(user.id))) {
            throw new Error("Invalid token");
        }

        next();
    } catch (e: any) {
        res.status(401).json({ error: e.message });
    }
}
