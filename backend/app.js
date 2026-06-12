import express from "express";
import product from "./routes/productRoutes.js";
import errorHandleMiddleware from "./middleware/error.js";
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";


const app = express();
// Increase payload size limits to accept base64 avatar images
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(fileUpload());

// Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Error Middleware
app.use(errorHandleMiddleware);

export default app;