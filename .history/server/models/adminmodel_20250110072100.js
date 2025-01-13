
import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLenght: 8
    },

}, { timestamps: true })

export const Admin = new mongoose.model("Admin", AdminSchema)