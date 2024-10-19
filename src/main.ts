
import { configEnv } from "../config/config.ts";
import app from "./app.ts";

const port = configEnv.PORT;

app.addEventListener("listen", ({ port }) => {
    console.log(`Server is running on http://localhost:${port}`);
});

await app.listen({ port: +port });

