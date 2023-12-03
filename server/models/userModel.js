import mongoose from "mongoose";
import validator from "validator";


const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("Not a valid email")
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    gender:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        required:false
    },
    isSeller:{
        type:Boolean,
        required:true
    },
    isVerified:{
        type:Boolean,
        required:true
    },
    registrationOTP:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    date_created:Date,
    date_updated:Date
})

const User = new mongoose.model('users', userSchema)
// module.exports = user
export default User