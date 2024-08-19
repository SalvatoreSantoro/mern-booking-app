import mongoose, { connection } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

export default connectDB;
