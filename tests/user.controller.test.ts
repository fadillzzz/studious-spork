import supertest from "supertest";
import { app } from "../src/app";
import { getUserService } from "../src/services/registry";

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

    it("should be able to retrieve an existing user", async () => {
        const userService = getUserService();
        const user = await userService.create({
            name: "fake user",
            email: "bruh@email.com",
            password: "123456789",
        });

        const response = await supertest(app).get(`/users/${user.id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: user.id,
                name: user.name,
                email: user.email,
            }),
        );
    });
});
