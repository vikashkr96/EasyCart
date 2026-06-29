import express from "express";
import product from "./routes/productRoutes.js";
import errorHandleMiddleware from "./middleware/error.js";
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from 'dotenv';


const app = express();
// Increasing payload size limits to accept base64 avatar images
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
// app.use(fileUpload({useTempFiles:true,tempFileDir:"/tmp/"}));  

// Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Error Middleware
app.use(errorHandleMiddleware);

dotenv.config({path:'backend/config/config.env'})

export default app;