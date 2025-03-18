import mongoose from "mongoose";
export const connectDB = async () => {
  console.log(process.env.MONGO_URI);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`ERROR ${error.message}`);
    process.exit(1); // one means fail 0 means success
  }
};
