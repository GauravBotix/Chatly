import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDb connected successfully to: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDb connection error: ${error}`);
    process.exit(1);
  }
};
