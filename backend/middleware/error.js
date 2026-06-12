import HandleError from "../utils/handleError.js";

export default (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Cast Error
    if (err.name === "CastError") {
        const message = `Invalid Resource: ${err.path}`;
        err = new HandleError(message, 400);
    }

    // Mongoose Validation Error - extract readable messages
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((val) => val.message);
        const message = messages.join(', ');
        err = new HandleError(message, 400);
    }

    // Duplicate Key Error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];

        const message = `${field} already exists`;
        err = new HandleError(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};