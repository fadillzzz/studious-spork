import express from "express";
import bodyParser from "body-parser";
import { UserController } from "./controllers/user.controller";
import { UserCreateValidator } from "./validators/user.create.validator";
import { getAuthService, getUserService } from "./services/registry";
import { AuthController } from "./controllers/auth.controller";
import { AuthValidator } from "./validators/auth.validator";
import { UserGetValidator } from "./validators/user.get.validator";
import { errorResponseMiddleware } from "./middlewares/error.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";

const app = express();
app.use(bodyParser.json());

const userController = new UserController(getUserService());
const authController = new AuthController(getAuthService(), getUserService());
app.post(
    "/tokens",
    AuthValidator,
    errorResponseMiddleware,
    authController.create.bind(authController),
);
app.post(
    "/users",
    UserCreateValidator,
    errorResponseMiddleware,
    userController.create.bind(userController),
);
app.get(
    "/users/:id",
    authMiddleware,
    UserGetValidator,
    errorResponseMiddleware,
    userController.get.bind(userController),
);

export { app };
