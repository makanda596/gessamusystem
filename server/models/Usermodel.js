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
    submittedtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubmitTask" }],
    alerts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Alert" }],
    myprojects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Myproject" }],
        avatar: {
        type: String,
        default: ""
    },
    // completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubmitTask" }],
    isVerified:{type:Boolean, default:false },
    verificationToken:String,
    verificationTokenExpiresAt:Date,
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
