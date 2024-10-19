// deno-lint-ignore-file
import type { Context } from "oak";
import type { IUser } from "../models/userModel.ts";
import { createUser, getAllUsers, getUserById } from "../services/userServices.ts";


export const getUsers = async (ctx: Context) => {
    try {
        const users = await getAllUsers();
        ctx.response.status = 200;
        ctx.response.body = users

        // deno-lint-ignore no-explicit-any
    } catch (error: any) {
        ctx.response.status = error.status || 500;
        ctx.response.body = { message: error.message || "Internal Server Error" };
    }
};

export const createUserController = async (ctx: Context) => {
    try {
        const { value } = ctx.request.body();
        // Assuming value is in JSON format
        const userData = await value;
        const user = await createUser(userData as IUser);

        if (user) {
            ctx.response.status = 200;
            ctx.response.body = { success: true, message: 'User created successfully!', user }
        }

    } catch (error: any) {
        ctx.response.status = error.status || 500;
        ctx.response.body = { message: error.message || "Internal Server Error" };
    }
};

export const getUserController = async (ctx: Context | any) => {
    try {

        const id = ctx?.params?.id!;
        const user = await getUserById(id);
        if (!user) {
            ctx.response.status = 404;
            ctx.response.body = { message: "User not found" };
            return;
        }
        ctx.response.status = 200;
        ctx.response.body = user;
    } catch (error: any) {
        ctx.response.status = error.status || 500;
        ctx.response.body = { message: error.message || "Internal Server Error" };
    }
};
