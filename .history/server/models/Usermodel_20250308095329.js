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
    // admNo: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // year: {
    //     type:Number,
    //     required: true
    // },
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
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    avatar: {
        type: String,
        default: ""
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
