import express from "express";
import bodyParser from "body-parser";
import { UserController } from "./controllers/user.controller";

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const userController = new UserController();
app.post("/users", userController.create);

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
