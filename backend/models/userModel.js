import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

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

userSchema.pre("save", async function(next){
    this.password = await bcryptjs.hash(this.password, 10);

    if(!this.isModified("password")){
        return next();
    }
})


export default mongoose.model("User",userSchema);