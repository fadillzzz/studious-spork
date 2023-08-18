import { User } from "../interfaces/user.interface";

/**
 * Transforms the user object into a more appropriate interface for API consumption.
 * Sensitive information such as the password field will be stripped.
 *
 * @param User user
 * @return Object
 */
export function transformUser(user: User) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
}
