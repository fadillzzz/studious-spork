import { Schema, checkSchema } from "express-validator";
import { getUserService } from "../services/registry";

export const userCreateSchema: Schema = {
    name: {
        trim: true,
        isString: {
            errorMessage: "Must be a string",
            bail: true,
        },
        isLength: {
            options: { min: 1 },
            errorMessage: "Must be at least 1 character long",
        },
    },
    email: {
        trim: true,
        isEmail: { errorMessage: "Must be an email", bail: true },
        custom: {
            options: async (value: string) => {
                const userService = getUserService();

                if (await userService.existsByEmail(value)) {
                    throw new Error("Email is already in use");
                }
            },
        },
    },
    password: {
        isString: { bail: true, errorMessage: "Must be a string" },
        isLength: {
            options: {
                min: 8,
            },
            errorMessage: "Must be at least 8 characters long",
        },
    },
};

export const userCreateValidator = checkSchema(userCreateSchema, ["body"]);
