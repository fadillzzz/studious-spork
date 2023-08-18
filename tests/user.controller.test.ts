import supertest from "supertest";
import { app } from "../src/app";
import { disconnectDb, initDb } from "../src/db";

describe("UserController", () => {
    it("should be able to create a new user", async () => {
        const response = await supertest(app).post("/users").send({
            name: "Test user",
            email: "testuser@fakeemail.com",
            password: "somerandompassword",
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                name: "Test user",
                email: "testuser@fakeemail.com",
            }),
        );
    });
});
