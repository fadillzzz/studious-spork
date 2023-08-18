import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { matchedData, validationResult } from "express-validator";

export class AuthController {
    private authService: AuthService;
    private userService: UserService;

    constructor(authService: AuthService, userService: UserService) {
        this.authService = authService;
        this.userService = userService;
    }

    async create(req: Request, res: Response): Promise<Response> {
        const validated = matchedData(req);

        const user = await this.userService.getByEmail(validated.email);
        const token = await this.authService.create(user!);

        return res.json({ token });
    }
}
