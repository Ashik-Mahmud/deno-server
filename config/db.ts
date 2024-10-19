import process from "node:process";
import mongoose, { ConnectOptions } from "npm:mongoose@^6.7";
import { configEnv } from "./config.ts";

// Mongoose connection setup with explicit ConnectOptions

// Ensure MONGO_URI is not undefined or throw an error
if (!configEnv.DATABASE_URL) {
    throw new Error("MONGO_URI environment variable not defined");
}
const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(configEnv.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
            process.exit(1); // Exit process with failure
        }
    }
};

export default connectDB;


