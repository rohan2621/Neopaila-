import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);

    // retry loop (fixes Atlas wake-up + Render cold start)
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
