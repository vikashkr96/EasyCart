import app from "./app.js";
import dotenv from "dotenv";
import { connectMongoDatabase } from "./config/db.js";
import { v2 as cloudinary } from "cloudinary";


// Load env vars FIRST
dotenv.config({ path: "./backend/config/config.env" });


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


// Connect DB
connectMongoDatabase();


const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});


process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down`);
    process.exit(1);
});


process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=>{
        process.exit(1);
    });
});