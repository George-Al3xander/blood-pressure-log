"use server"
import mongoose, { ConnectOptions } from 'mongoose';
import User from './schemas/user';

const uri = process.env.MONGO_URI!

const clientOptions: ConnectOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectToDatabase() {

  try {
    await mongoose.connect(uri, clientOptions);
    // await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
  } catch (error) {
    console.log(error)
    console.error("Error connecting to MongoDB:", error);
  }
}

async function disconnectFromDatabase() {
   try {
    await mongoose.disconnect();
   
    console.log("You successfully disconnected from MongoDB!");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
}





export { connectToDatabase, disconnectFromDatabase };
