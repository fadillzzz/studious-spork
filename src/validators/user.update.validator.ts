import { Schema, checkSchema } from "express-validator";
import { userCreateSchema } from "./user.create.validator";

export const userUpdateSchema: Schema = userCreateSchema;
userUpdateSchema.name.optional = true;
userUpdateSchema.email.optional = true;
userUpdateSchema.password.optional = true;

export const userUpdateValidator = checkSchema(userUpdateSchema, ["body"]);
