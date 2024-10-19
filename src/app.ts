
import logger from "logger";
import { Application } from "oak";
import connectDB from "../config/db.ts";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.ts";
import router from "./routes/index.ts";

const app = new Application();

connectDB()

// Logger middleware
app.use(logger.logger);
app.use(logger.responseTime);

// Global error handler
app.use(errorHandler);

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

// Handle 404 - not found
app.use(notFoundHandler);

export default app;
