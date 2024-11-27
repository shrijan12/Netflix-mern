import mongoose from "mongoose";
import { ENV_VAR } from "./configVar.js";


export const connectDB = async() => {
    try {
      const conn =  await mongoose.connect(ENV_VAR.MONGO_URI);
      console.log("MongoDB Connected: "+ conn.connection.host )
    } catch (error) {
        console.error("Error connecting to MongoDB:" + error.message);
        process.exit(1); //here 1 means there was an error and 0 means success
    }
}