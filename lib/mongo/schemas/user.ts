import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const userSchema = new Schema(
    {
        name: {
            first: {
                type: String,
                required: true,
            },
            last: {
                type: String,
                required: true,
            },
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const User =
    mongoose.models && mongoose.models.User
        ? (mongoose.models.User as any)
        : mongoose.model("User", userSchema);
export default User;
