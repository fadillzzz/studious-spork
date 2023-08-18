import { UserDbRepository } from "../repositories/user.db.repository";
import { UserService } from "./user.service";

let userService: UserService | null = null;

/**
 *  Returns a cached version of the UserService or instantiates a new one
 *
 *  @return UserService
 */
export function getUserService(): UserService {
    if (userService === null) {
        userService = new UserService(new UserDbRepository());
    }

    return userService;
}
