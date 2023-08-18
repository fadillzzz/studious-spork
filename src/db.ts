import knex, { Knex } from "knex";
import { Model } from "objection";

export let connection: Knex;

export function initDb() {
    // Initialize knex.
    connection = knex({
        client: "pg",
        connection: {
            connectionString:
                process.env.PG_CONNECTION ||
                "postgresql://postgres:mysecretpassword@localhost:5432/postgres",
        },
    });

    // Give the knex instance to objection.
    Model.knex(connection);
}

export async function disconnectDb() {
    await connection.destroy();
}
