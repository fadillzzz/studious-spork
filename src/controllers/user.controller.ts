import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { UserService } from "../services/user.service";
import { User } from "../interfaces/user.interface";
import { transformUser } from "../transformers/user.transformer";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async create(req: Request, res: Response) {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }

        const validated = matchedData(req) as Omit<User, "id">;

        const user: User = await this.userService.create(validated);

        return res.json(transformUser(user));
    }
}
