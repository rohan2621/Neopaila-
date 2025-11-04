import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async (params) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDb is loaded");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
