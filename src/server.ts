import { app } from "./app";
import { initDb } from "./db";

initDb();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
