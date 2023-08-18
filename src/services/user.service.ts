import argon2 from "argon2";
import { User } from "../interfaces/user.interface";
import { UserRepository } from "../interfaces/user.repository.interface";
import { v4 as uuid } from "uuid";

export class UserService {
    private userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    async create(userPayload: Omit<User, "id">): Promise<User> {
        const user: User = {
            ...userPayload,
            id: uuid(),
            password: await argon2.hash(userPayload.password),
        };

        await this.userRepo.save(user);

        return user;
    }

    async existsByEmail(email: string): Promise<boolean> {
        return this.userRepo.existsByEmail(email);
    }
}
