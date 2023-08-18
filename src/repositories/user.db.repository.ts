import { User } from "../interfaces/user.interface";
import { UserRepository } from "../interfaces/user.repository.interface";
import { User as UserModel } from "../models/user.model";

export class UserDbRepository implements UserRepository {
    async save(user: User): Promise<boolean> {
        if (await this.exists(user.id)) {
            await UserModel.query().where("id", user.id).update({
                name: user.name,
                email: user.email,
                password: user.password,
            });
        } else {
            await UserModel.query().insert({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
            });
        }

        return true;
    }

    async exists(id: string): Promise<boolean> {
        return this.existsBy("id", id);
    }

    async existsByEmail(email: string): Promise<boolean> {
        return this.existsBy("email", email);
    }

    /**
     * Look for an existing row, given a column and value pair. Returns true if a row is found.
     *
     * @param string column
     * @param string val
     * @return Promise<boolean>
     */
    private async existsBy(column: string, val: string): Promise<boolean> {
        const count = (
            await UserModel.query().where(column, val).count().as("count")
        )[0] as unknown as { count: string };

        return count.count === "1";
    }
}
