import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./backend/config/config.env" });

export const connectMongoDatabase = () => {
    mongoose.connect(process.env.DB_URL)
        .then((data) => {
            console.log(`MongoDB connected with server ${data.connection.host}`);
        })
};