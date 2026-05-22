import handleAsyncError from '../middleware/handleAsyncError.js'
import User from "../models/userModel.js";
import HandleError from '../utils/handleError.js';
import { sendToken } from '../utils/jwtToken.js';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto';



export const registerUser = handleAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "This is temp id",
            url: "This is a temp url"
        }
    })

    sendToken(user, 201, res);
})

// Login User 


export const loginUser = handleAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new HandleError("Email or Password cannot be empty", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new HandleError("Invalid Email or Password", 401));
    }

    // Compare Password
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new HandleError("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);

})

// Logout user

export const logout = handleAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Successfully Loged Out"
    })
})

// forgot password

export const requestPasswordReset = handleAsyncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new HandleError("User doesn't exist", 404));
    }

    let resetToken;

    try {
        resetToken = user.generatePasswordResetToken();
        // save token in DB
        await user.save({ validateBeforeSave: false });

    } catch (error) {
        return next(
            new HandleError(
                "Could not save reset token, Please try again later",
                500
            )
        );
    }

    // reset password url
    const resetPasswordURL =
        `http://localhost/api/v1/reset/${resetToken}`;

    // email message
    const message = `Your password reset token is:-${resetPasswordURL}
    This link will expire in 15 minutes.
    If you have not requested this email, then please ignore it.
`;

    try {
        await sendEmail({
            email: user.email,
            subject: "EasyCart Password Recovery",
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });

    } catch (error) {

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(
            new HandleError(error.message, 500)
        );
    }
})

// reset password

export const resetPassword = handleAsyncError(async (req, res, next) => {

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(
            new HandleError(
                "Reset password link is invalid or has been expired.",
                400
            )
        );
    }

    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return next(
            new HandleError("Password doesn't match", 400)
        );
    }

    user.password = password;
    user.resetPasswordToken = undefined,
        user.resetPasswordExpire = undefined,
        await user.save();
    sendToken(user, 200, res);

});


