import express from "express";
import bodyParser from "body-parser";
import { UserController } from "./controllers/user.controller";
import { UserCreateValidator } from "./validators/user.create.validator";
import { getAuthService, getUserService } from "./services/registry";
import { AuthController } from "./controllers/auth.controller";
import { AuthValidator } from "./validators/auth.validator";

const app = express();
app.use(bodyParser.json());

const userController = new UserController(getUserService());
const authController = new AuthController(getAuthService(), getUserService());
app.post("/tokens", AuthValidator, authController.create.bind(authController));
app.post(
    "/users",
    UserCreateValidator,
    userController.create.bind(userController),
);

export { app };
