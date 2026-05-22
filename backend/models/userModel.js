import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt  from "jsonwebtoken";
import crypto from "crypto";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        maxLength:[25,"Invalid name. Please enter a name with fewer than 25 characters."],
        minLength:[3, "Name should contain more than 3 characters"]
    },

    email:{
        type:String,
        required:[true, "Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },

    password:{
        type:String,
        required:[true,"Please enter password"],
        minlength:[8,"Password must be at least 8 characters long"],

        // Strong Password Validation
        match:[
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/,
            "Password must contain uppercase, lowercase, number and special character"
        ],

        select:false
    },

    avatar:{
        public_id:{
            type:String,
            required:true
        },

        url:{
            type:String,
            required:true
        }
    },

    role:{
        type:String,
        default:"user"
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date

},{timestamps:true});


// PASSWORD HASHING ....

userSchema.pre("save", async function(){

    if(!this.isModified("password")){
        return;
    }

    this.password = await bcryptjs.hash(this.password, 10);
});

// JWT 
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn:process.env.JWT_EXPIRE
    } )
}

// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcryptjs.compare(enteredPassword, this.password);
}

// generate token

userSchema.methods.generatePasswordResetToken =function() {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15*60*1000 ; // 15 min
    return resetToken;
}


export default mongoose.model("User",userSchema);