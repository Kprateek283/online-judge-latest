import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DBConnection = async () => {
  const MONGO_URI = process.env.MONGODB_URL;
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB Connection Established");
  } catch (error) {
    console.log("Error while connecting to MongoDB", error);
  }
};

export { DBConnection };
