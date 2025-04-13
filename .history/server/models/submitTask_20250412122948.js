import mongoose from 'mongoose';

const submitSchema = new mongoose.Schema({
   userId:{type:mongoose.Schema.Type.ObjectId, ref:"User"},
  
    title:{
        type: String,
        required: true
    },
   
    status: {
        type: String,
        default: 'Pending'
    }
    
});

export const Submission = mongoose.model('Submission', submitSchema);
