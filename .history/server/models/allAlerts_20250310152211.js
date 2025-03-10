import mongoose from 'mongoose';


const allalertSchema = new mongoose.Schema({
        message: String,
        userId: {
                required:true, 
        }, // Reference User
        createdAt: { type: Date, default: Date.now },
    

}, { timestamps: true })

export const AllAlert = mongoose.model('AllAlert', allalertSchema); 