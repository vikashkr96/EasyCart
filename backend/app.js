import express from "express";
import product from "./routes/productRoutes.js";
import errorHandleMidleware from "./middleware/error.js";
import user from './routes/userRoutes.js';
import cookieParser from "cookie-parser";

const app = express();
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", product);
app.use("/api/v1", user);

// Error Middleware
app.use(errorHandleMidleware);

export default app;