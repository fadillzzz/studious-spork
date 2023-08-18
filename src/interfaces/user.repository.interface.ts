import { User } from "./user.interface";

export interface UserRepository {
    /**
     * Writes user data into the database. Returns true if the operation was successful.
     *
     * @return Promise<boolean>
     */
    save(user: User): Promise<boolean>;

    /**
     * Returns true if the given ID exists, false otherwise
     *
     * @return Promise<boolean>
     */
    exists(id: string): Promise<boolean>;

    /**
     * Returns true if the given email exists, false otherwise
     *
     * @return Promise<boolean>
     */
    existsByEmail(email: string): Promise<boolean>;
}
