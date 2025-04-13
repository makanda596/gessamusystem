import mongoose from 'mongoose';


const alertSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
   
}, { timestamps: true })

export const Alert = mongoose.model('Alert', alertSchema); 