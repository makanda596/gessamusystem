import mongoose from 'mongoose';


const allalertSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
  
    status: {
        type: String,
        enum: ['unread', 'read'],
        default: 'unread',
        
    }
}, { timestamps: true })

export const AllAlert = mongoose.model('AllAlert', allalertSchema); 