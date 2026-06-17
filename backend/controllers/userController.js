import { equal } from 'assert';
import handleAsyncError from '../middleware/handleAsyncError.js'
import User from "../models/userModel.js";
import HandleError from '../utils/handleError.js';
import { sendToken } from '../utils/jwtToken.js';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto';
import {v2 as cloudinary} from 'cloudinary';


// Register user
export const registerUser = handleAsyncError(async (req, res, next) => {

    const { name, email, password, avatar } = req.body;

    let myCloud = {
    public_id: "default_avatar",
    secure_url: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
    };


    if (avatar && avatar.includes("base64")) {

        myCloud = await cloudinary.uploader.upload(avatar, {
            folder:"avatars",
            width:150,
            crop:"scale"
        });

    }


    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.url || myCloud.secure_url
        }
    });


    sendToken(user, 201, res);
});

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

// Get user details
export const getUserDetails = handleAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
});

// updating the password
export const updatePassword = handleAsyncError(async(req, res, next)=>{
    const {oldPassword, newPassword, confirmPassword} = req.body;

    const user = await User.findById(req.user.id).select('+password');

    const checkPasswordMatch = await user.comparePassword(oldPassword);

    if(!checkPasswordMatch){
        return next(new HandleError('Old password is incorrect', 404));
    }

    if(newPassword !== confirmPassword){
        return next(new HandleError("Password doesn't match", 404));
    }

    // CHECK FOR NEW AND CURRENT PASS... NOT TO BE SAME
    const isSamePassword = await user.comparePassword(newPassword);

    if(isSamePassword){
        return next(
            new HandleError("New password cannot be same as old password", 400)
        );
    }

    user.password = newPassword;

    await user.save();

    sendToken(user, 200, res);
});

// updating user profile
export const updateProfile = handleAsyncError(async(req,res,next)=>{

    const {name, email} = req.body;


    const currentUser = await User.findById(req.user.id);


    // prevent update when nothing changed
    if(
        currentUser.name === name &&
        currentUser.email === email &&
        !req.files?.avatar
    ){
        return next(
            new HandleError("No changes made", 400)
        );
    }


    const updateUserDetails = {
        name,
        email
    };


    if(req.files?.avatar){


        // delete old image
        if(currentUser.avatar?.public_id){

            await cloudinary.uploader.destroy(
                currentUser.avatar.public_id
            );

        }


        const avatarFile = req.files.avatar;


        const myCloud = await cloudinary.uploader.upload(
            avatarFile.tempFilePath,
            {
                folder:"avatars",
                width:150,
                crop:"scale"
            }
        );


        updateUserDetails.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        };

    }



    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        updateUserDetails,
        {
            new:true,
            runValidators:true
        }
    );



    res.status(200).json({
        success:true,
        message:"Profile Updated Successfully",
        user: updatedUser
    });

});

// Admin - Getting All User Information
export const getUsersList = handleAsyncError(async(req, res, next)=>{
    const users =await User.find();
    res.status(200).json({
        success:true,
        users
    })

})

// Admin - Getting Single User Information
export const getSingleUser = handleAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new HandleError("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user
    });

});

// Admin updating User Role
export const updateUserRole = handleAsyncError(async (req, res, next) => {

    const { role } = req.body;

    const newUserData = {
        role
    };

    const user = await User.findByIdAndUpdate(
        req.params.id,
        newUserData,
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    if (!user) {
        return next(new HandleError("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user
    });

});

// Admin deleting the User profile
export const deleteUser = handleAsyncError(async (req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new HandleError("User not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });

});








