import express from "express";
import bodyParser from "body-parser";
import { Model } from "objection";
import Knex from "knex";
import { UserController } from "./controllers/user.controller";
import { UserCreateValidator } from "./validators/user.create.validator";
import { getUserService } from "./services/registry";

// Initialize knex.
const knex = Knex({
    client: "pg",
    connection: {
        connectionString:
            process.env.PG_CONNECTION ||
            "postgresql://postgres:mysecretpassword@localhost:5432/postgres",
    },
});

// Give the knex instance to objection.
Model.knex(knex);

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const userController = new UserController(getUserService());
app.post(
    "/users",
    UserCreateValidator,
    userController.create.bind(userController),
);

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
