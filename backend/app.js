import express from "express";
import product from "./routes/productRoutes.js";
import errorHandleMidleware from "./middleware/error.js";
import user from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1", product);
app.use("/api/v1", user);

// Error Middleware
app.use(errorHandleMidleware);

export default app;