import { UserDbRepository } from "../repositories/user.db.repository";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";

let userService: UserService;
let authService: AuthService;

/**
 *  Returns a cached version of the UserService or instantiates a new one
 *
 *  @return UserService
 */
export function getUserService(): UserService {
    if (!userService) {
        userService = new UserService(new UserDbRepository(), getAuthService());
    }

    return userService;
}

export function getAuthService(): AuthService {
    if (!authService) {
        authService = new AuthService();
    }

    return authService;
}
