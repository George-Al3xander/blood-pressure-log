import mongoose, { ConnectOptions } from "mongoose";

const uri = process.env.MONGO_URI!;

const clientOptions: ConnectOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectToDatabase() {
    "use server";
    if (mongoose.connection.readyState == 0) {
        try {
            await mongoose.connect(uri, clientOptions);
            // await mongoose.connection.db.admin().command({ ping: 1 });
            console.log("You successfully connected to MongoDB!");
        } catch (error) {
            console.log(error);
            console.error("Error connecting to MongoDB:", error);
        }
    }
}
export { default as Report } from "./schemas/report";
export { schemas } from "./schemas/schemas";
export { default as User } from "./schemas/user";
export { connectToDatabase };
