import { User, type IUser } from "../models/userModel.ts";


// Function to create a new user
export const createUser = async (userData: IUser) => {
    const user = new User(userData);
    return await user.save();
};

// Function to fetch all users
export const getAllUsers = async () => {
    return await User.find();
};

// Function to fetch a user by ID
export const getUserById = async (id: string) => {
    return await User.findById(id);
};
