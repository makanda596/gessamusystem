import mongoose from 'mongoose';


const allalertSchema = new mongoose.Schema({
        message: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference User
        createdAt: { type: Date, default: Date.now },
    

}, { timestamps: true })

export const AllAlert = mongoose.model('AllAlert', allalertSchema); 