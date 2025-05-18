import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load env variables

const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://tayyabprince193:Poco1444pro%23@easy-notes.2z3fgti.mongodb.net/?retryWrites=true&w=majority&appName=easy-notes';

const connectDB = async () => {
  try {
    console.log("🚀 Attempting MongoDB connection...");
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
