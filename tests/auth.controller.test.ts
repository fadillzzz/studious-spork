import supertest from "supertest";
import { app } from "../src/app";
import { createTestUser } from "./helpers";

describe("AuthController", () => {
    it("should be able to create token", async () => {
        const user = await createTestUser({
            name: "fake user",
            email: "bruh@email.com",
        });

        const response = await supertest(app).post("/tokens").send({
            email: user.email,
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
