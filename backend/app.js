import express from "express";
import product from "./routes/productRoutes.js";
import errorHandleMidleware from "./middleware/error.js";
import handleAsyncError from "./middleware/handleAsyncError.js";

const app = express();

//  Middleware 
app.use(express.json());


app.use("/api/v1", product);

app.use(errorHandleMidleware);
app.use(handleAsyncError);
export default app;