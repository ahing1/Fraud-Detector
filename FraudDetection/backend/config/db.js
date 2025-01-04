import mongoose from "mongoose";
import { MONGO_URI } from "./settings.js";

export const connectDB = async () => {
    try {
      const connection = await mongoose.connect(MONGO_URI, {
        dbName: "Fraud_Detection"
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  };
