import { User } from "../src/interfaces/user.interface";
import { getAuthService, getUserService } from "../src/services/registry";

/**
 * Creates a test user with a password set to 123456789
 *
 * @param string Object.name
 * @param string Object.email
 * @return Promise<User>
 */
export async function createTestUser({
    name,
    email,
}: {
    name: string;
    email: string;
}): Promise<User> {
    const userService = getUserService();
    return userService.create({
        name,
        email,
        password: "123456789",
    });
}

/**
 * Creates a test user and generate a token
 *
 * @param string Object.name
 * @param string Object.email
 * @return Promise<{user: User, token: string}>
 */
export async function createUserWithToken({
    name,
    email,
}: {
    name: string;
    email: string;
}): Promise<{ user: User; token: string }> {
    const user = await createTestUser({ name, email });
    const token = await createToken(user);

    return { user, token };
}

export async function createToken(user: User): Promise<string> {
    const authService = getAuthService();
    return authService.create(user);
}
