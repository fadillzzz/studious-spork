import supertest from "supertest";
import { app } from "../src/app";
import { getUserService } from "../src/services/registry";

describe("AuthController", () => {
    it("should be able to create token", async () => {
        const userService = getUserService();
        await userService.create({
            name: "fake user",
            email: "bruh@email.com",
            password: "123456789",
        });

        const response = await supertest(app).post("/tokens").send({
            email: "bruh@email.com",
            password: "123456789",
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                token: expect.any(String),
            }),
        );
    });
});
