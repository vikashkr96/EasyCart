import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectMongoDatabase } from "./config/db.js";

// Load env vars
dotenv.config({ path: "./backend/config/config.env" });

// Connect DB
connectMongoDatabase();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});