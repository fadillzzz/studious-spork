import { Schema, checkSchema } from "express-validator";

const userGetSchema: Schema = {
    id: {
        isUUID: {
            errorMessage: "Must be a valid UUID",
            bail: true,
        },
    },
};

export const userGetValidator = checkSchema(userGetSchema, ["params"]);
