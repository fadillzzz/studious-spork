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

    async getByEmail(email: string): Promise<User | null> {
        return this.userRepo.getByEmail(email);
    }

    async existsByEmail(email: string): Promise<boolean> {
        return this.userRepo.existsByEmail(email);
    }
}
