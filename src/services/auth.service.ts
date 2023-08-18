import { User } from "../interfaces/user.interface";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export class AuthService {
    private secret = "SomeRandomSecretKeyForTesting";

    /**
     * Creates a JWT token for the given user
     *
     * @param User user
     * @return Promise<string>
     */
    async create(user: User): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                { id: user.id, name: user.email, email: user.email },
                this.secret,
                {},
                (err, token) => {
                    if (err) {
                        reject(err);
                    }

                    if (token) {
                        resolve(token);
                    }
                },
            );
        });
    }

    /**
     * Verify the given token and returns a partial User object
     *
     * @param string token
     * @return Promise<Omit<User, 'password'>>
     */
    async verify(token: string): Promise<Omit<User, "password">> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secret, {}, (err, decoded) => {
                if (err) {
                    reject(err);
                }

                if (decoded) {
                    resolve(decoded as Omit<User, "password">);
                }
            });
        });
    }

    /**
     * Verify that the given plain text password matches the given hash
     *
     * @param string hash
     * @param string password
     * @return Promise<boolean>
     */
    async verifyHash(hash: string, password: string): Promise<boolean> {
        return argon2.verify(hash, password);
    }

    /**
     * Given a password string, return a hashed version of it
     *
     * @param string password
     * @return Promise<string>
     */
    async hash(password: string): Promise<string> {
        return argon2.hash(password);
    }
}
