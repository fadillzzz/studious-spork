import { Schema, checkSchema } from "express-validator";
import { getUserService } from "../services/registry";

export const UserGetSchema: Schema = {
    id: {
        isUUID: {
            errorMessage: "Must be a valid UUID",
            bail: true,
        },
        custom: {
            options: async (value: string) => {
                const userService = getUserService();

                if (!(await userService.exists(value))) {
                    throw new Error("User does not exist");
                }
            },
        },
    },
};

export const UserGetValidator = checkSchema(UserGetSchema, ["params"]);
