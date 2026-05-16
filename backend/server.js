import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectMongoDatabase } from "./config/db.js";

// handle uncaught exception errors 
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down, due to uncaught exception error!`);
    process.exit(1);
});

// Load env vars
dotenv.config({ path: "./backend/config/config.env" });

// Connect DB
connectMongoDatabase();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});

process.on("unhandledRejection", (err) =>{
    console.log(`Error: ${err.message}`);
    console.log("Server is shutting down, due to unhandled promise rejection");
    server.close(()=>{
        process.exit(1);
    });
});