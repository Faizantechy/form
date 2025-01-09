import dotenv from "dotenv";
dotenv.config();


import mongoose from "mongoose";

const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected TO DB:");
  } catch (error) {
    console.log("Failed to connect!");
    console.log(error);
  }
};


export default connectDataBase