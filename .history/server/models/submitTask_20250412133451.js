import mongoose from 'mongoose';

const SubmitTaskSchema = new mongoose.Schema({
   userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  
    title:{
        type: String,
        required: true
    },
   
    status: {
        type: Boolean,
        default: Pending
    }
    
});

export const SubmitTask = mongoose.model('SubmitTask', SubmitTaskSchema);
