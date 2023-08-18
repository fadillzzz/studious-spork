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

    async create(req: Request, res: Response): Promise<Response> {
        const validated = matchedData(req) as Omit<User, "id">;

        const user: User = await this.userService.create(validated);

        return res.json(transformUser(user));
    }

    async get(req: Request, res: Response): Promise<Response> {
        const validated = matchedData(req);

        const user = await this.userService.get(validated.id);

        return res.json(transformUser(user!));
    }

    async update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const validated = matchedData(req, { locations: ["body"] });

        await this.userService.update(id, validated);

        const user = await this.userService.get(id);

        return res.json(transformUser(user!));
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;

        await this.userService.delete(id);

        return res.status(204).json();
    }
}
