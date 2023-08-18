import { connection, disconnectDb, initDb } from "../src/db";
import { User } from "../src/models/user.model";

beforeAll(async () => {
    initDb();

    // Clean the database before running any tests
    await connection(User.tableName).truncate();
});

afterAll(() => {
    disconnectDb();
});
