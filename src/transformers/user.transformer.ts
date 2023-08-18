import { User } from "../interfaces/user.interface";

export function transformUser(user: User) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
}
