import { Model } from "objection";
import { User as UserInterface } from "../interfaces/user.interface";

export class User extends Model {
    static get tableName() {
        return "users";
    }

    id: string;
    name: string;
    email: string;
    password: string;

    toObject(): UserInterface {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
        };
    }
}
