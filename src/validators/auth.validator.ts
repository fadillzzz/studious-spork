import { Schema, body, checkSchema } from "express-validator";
import { getAuthService, getUserService } from "../services/registry";

const AuthValidatorSchema: Schema = {
    email: {
        trim: true,
        isEmail: { errorMessage: "Must be an email", bail: true },
    },
    password: {
        isString: { bail: true, errorMessage: "Must be a string" },
        isLength: {
            options: {
                min: 8,
            },
            errorMessage: "Must be at least 8 characters long",
            bail: true,
        },
        custom: {
            if: body("email").notEmpty(),
            options: async (password: string, { req }) => {
                const email = req.body.email;
                const userService = getUserService();
                const authService = getAuthService();

                const user = await userService.getByEmail(email);

                if (
                    !user ||
                    !(await authService.verifyHash(user.password, password))
                ) {
                    throw new Error("Invalid email or password");
                }
            },
        },
    },
};

export const AuthValidator = checkSchema(AuthValidatorSchema, ["body"]);
