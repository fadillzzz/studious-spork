import express from "express";
import bodyParser from "body-parser";
import { UserController } from "./controllers/user.controller";
import { UserCreateValidator } from "./validators/user.create.validator";
import { getUserService } from "./services/registry";

const app = express();
app.use(bodyParser.json());

const userController = new UserController(getUserService());
app.post(
    "/users",
    UserCreateValidator,
    userController.create.bind(userController),
);

export { app };
