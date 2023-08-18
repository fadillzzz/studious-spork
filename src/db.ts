import knex, { Knex } from "knex";
import { Model } from "objection";

export let connection: Knex;

/**
 * Initialize connection to the database
 */
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

/**
 * Disconnect from the database
 */
export async function disconnectDb() {
    await connection.destroy();
}
