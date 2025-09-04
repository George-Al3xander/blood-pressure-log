import { env } from "@/shared/config";
import mongoose, { ConnectOptions } from "mongoose";

const clientOptions: ConnectOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
};

export const connectMongo = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(env.MONGO_URI, clientOptions);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
};
