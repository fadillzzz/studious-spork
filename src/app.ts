import express from "express";
import bodyParser from "body-parser";
import { UserController } from "./controllers/user.controller";
import { userCreateValidator } from "./validators/user.create.validator";
import { getAuthService, getUserService } from "./services/registry";
import { AuthController } from "./controllers/auth.controller";
import { authValidator } from "./validators/auth.validator";
import { userGetValidator } from "./validators/user.get.validator";
import { errorResponseMiddleware } from "./middlewares/error.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";
import { userOwnerMiddleware } from "./middlewares/user.owner.middleware";
import { userUpdateValidator } from "./validators/user.update.validator";
import { userExistsMiddleware } from "./middlewares/user.exists.middleware";

const app = express();
app.use(bodyParser.json());

const userController = new UserController(getUserService());
const authController = new AuthController(getAuthService(), getUserService());
app.post(
    "/tokens",
    authValidator,
    errorResponseMiddleware,
    authController.create.bind(authController),
);
app.post(
    "/users",
    userCreateValidator,
    errorResponseMiddleware,
    userController.create.bind(userController),
);
app.get(
    "/users/:id",
    authMiddleware,
    userGetValidator,
    userExistsMiddleware,
    errorResponseMiddleware,
    userController.get.bind(userController),
);
app.patch(
    "/users/:id",
    authMiddleware,
    userGetValidator,
    userExistsMiddleware,
    userOwnerMiddleware,
    userUpdateValidator,
    errorResponseMiddleware,
    userController.update.bind(userController),
);

export { app };
