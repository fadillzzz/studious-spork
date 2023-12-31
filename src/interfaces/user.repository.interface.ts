import { User } from "./user.interface";

export interface UserRepository {
    /**
     * Writes user data into the database. Returns true if the operation was successful.
     *
     * @param User user
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
     * Updates the specified user with new data. Returns true if successful.
     *
     * @param string id
     * @param Partial<User> user
     * * @return Promise<boolean>
     */
    update(id: string, user: Partial<User>): Promise<boolean>;

    /**
     * Deletes a user based on the specified ID
     *
     * @param string id
     * @return Promise<boolean>
     */
    delete(id: string): Promise<boolean>;

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
