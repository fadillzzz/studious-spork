import { User } from "../interfaces/user.interface";
import { UserRepository } from "../interfaces/user.repository.interface";
import { v4 as uuid } from "uuid";
import { AuthService } from "./auth.service";

export class UserService {
    private userRepo: UserRepository;
    private authService: AuthService;

    constructor(userRepo: UserRepository, authService: AuthService) {
        this.userRepo = userRepo;
        this.authService = authService;
    }

    async create(userPayload: Omit<User, "id">): Promise<User> {
        const user: User = {
            ...userPayload,
            id: uuid(),
            password: await this.authService.hash(userPayload.password),
        };

        await this.userRepo.save(user);

        return user;
    }

    async get(id: string): Promise<User | null> {
        return this.userRepo.get(id);
    }

    async getByEmail(email: string): Promise<User | null> {
        return this.userRepo.getByEmail(email);
    }

    async update(id: string, userPayload: Partial<User>): Promise<boolean> {
        if (userPayload.password) {
            userPayload.password = await this.authService.hash(
                userPayload.password,
            );
        }

        return this.userRepo.update(id, userPayload);
    }

    async delete(id: string): Promise<boolean> {
        return this.userRepo.delete(id);
    }

    async exists(id: string): Promise<boolean> {
        return this.userRepo.exists(id);
    }

    async existsByEmail(email: string): Promise<boolean> {
        return this.userRepo.existsByEmail(email);
    }
}
