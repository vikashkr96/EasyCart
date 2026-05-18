import express from "express";
import product from "./routes/productRoutes.js";
import errorHandleMidleware from "./middleware/error.js";
import handleAsyncError from "./middleware/handleAsyncError.js";
import user from './routes/userRoutes.js'

const app = express();

//  Middleware 
app.use(express.json());

// route
app.use("/api/v1", product);
app.use("/api/v1", user);

app.use(errorHandleMidleware);
app.use(handleAsyncError);
export default app;