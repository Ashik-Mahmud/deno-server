// deno-lint-ignore-file
import { Context } from "oak";

// Global error handler
export const errorHandler = async (ctx: Context, next: () => Promise<unknown>) => {
    try {
        await next();
    } catch (err: any) {
        console.error("Error:", err.message);
        ctx.response.status = err.status || 500;
        ctx.response.body = { message: err.message || "Internal Server Error" };
    }
};

// 404 handler
export const notFoundHandler = (ctx: Context) => {
    ctx.response.status = 404;
    ctx.response.body = { message: "Not Found" };
};

