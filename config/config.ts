import { config } from "deno-env";

const env = config();

export const configEnv = {
    PORT: env.PORT || 8000,
    DATABASE_URL: env.DATABASE_URL,
    API_KEY: env.API_KEY,
};
