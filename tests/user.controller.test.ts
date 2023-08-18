import supertest from "supertest";
import { app } from "../src/app";
import { createUserWithToken } from "./helpers";

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
        const { user, token } = await createUserWithToken({
            name: "new fake user",
            email: "gamers@riseup.com",
        });

        const response = await supertest(app)
            .get(`/users/${user.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: user.id,
                name: user.name,
                email: user.email,
            }),
        );
    });

    it("should be able to update an existing user", async () => {
        const { user, token } = await createUserWithToken({
            name: "Wow",
            email: "mei@maiden.tv",
        });

        const response = await supertest(app)
            .patch(`/users/${user.id}`)
            .send({
                name: "Mei",
                email: "mei@twitch.tv",
            })
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                name: "Mei",
                email: "mei@twitch.tv",
            }),
        );
    });

    it("should be able to delete an existing user", async () => {
        const { user, token } = await createUserWithToken({
            name: "to be deleted",
            email: "will@delete.tld",
        });

        const response = await supertest(app)
            .delete(`/users/${user.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(204);

        const { user: user1, token: token1 } = await createUserWithToken({
            name: "remain",
            email: "user@checked.tld",
        });

        const checkResponse = await supertest(app)
            .get(`/users/${user.id}`)
            .set("Authorization", `Bearer ${token1}`);

        expect(checkResponse.statusCode).toBe(404);
    });
});
