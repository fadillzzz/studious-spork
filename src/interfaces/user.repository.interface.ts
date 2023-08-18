import { User } from "./user.interface";

export interface UserRepository {
    /**
     * Writes user data into the database. Returns true if the operation was successful.
     *
     * @return Promise<boolean>
     */
    save(user: User): Promise<boolean>;

    /**
     * Returns a user object give their ID. Returns null if it doesn't exist
     *
     * @param string id
     * @return Promise<User|null>
     */
    get(id: string): Promise<User | null>;

    /**
     * Returns a user object given their email address. Returns null if it doesn't exist
     *
     * @param string email
     * @return Promise<User|null>
     */
    getByEmail(email: string): Promise<User | null>;

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
