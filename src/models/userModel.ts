import bcrypt from "npm:bcrypt@^5.0.1";
import mongoose, { Document, Schema } from "npm:mongoose@^6.7";

// Define the User schema
export interface IUser extends Document {
    name: string;
    email: string;
}

const userSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,

    },
});
// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return next();

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10); // You can adjust the salt rounds
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};
export const User = mongoose.model<IUser>("User", userSchema);
