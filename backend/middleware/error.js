import HandleError from "../utils/handleError.js";

export default (err, req, res, next) => {

    console.log("ERROR MIDDLEWARE:", err);

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    // Multer Error
    if(err.name === "MulterError"){
        err = new HandleError(err.message, 400);
    }


    // Cast Error
    if (err.name === "CastError") {
        const message = `Invalid Resource: ${err.path}`;
        err = new HandleError(message, 400);
    }


    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors)
            .map((val) => val.message);

        err = new HandleError(messages.join(', '), 400);
    }


    // Duplicate Key Error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        err = new HandleError(`${field} already exists`, 400);
    }


    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
};