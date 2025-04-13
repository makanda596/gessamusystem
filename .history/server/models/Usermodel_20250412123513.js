import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
 
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    submittedtasks:[{type:mongoose.Schema.Types.ObjectId ,ref:"SubmitTask"}],
        avatar: {
        type: String,
        default: ""
    },
    isVerified:{type:Boolean, default:"false" },
    verificationToken:String,
    verificationTokenExpiresAt:Date,
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
