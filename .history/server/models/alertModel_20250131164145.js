import mongoose from 'mongoose';


const alertSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['unread', 'read'],
        default: 'unread'
    }
}, { timestamps: true })

export const Alert = mongoose.model('Alert', alertSchema); 