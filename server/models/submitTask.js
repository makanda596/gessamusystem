import mongoose from 'mongoose';

const SubmitTaskSchema = new mongoose.Schema({
   userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  
    title:{
        type: String,
        required: true
    },
   
    status: {
        type: String,
        enum: ["pending", "completed", "in-review"],
        default: "pending"
    },
    image: {
        type: String
    },
    
},{timestamps:true});

export const SubmitTask = mongoose.model('SubmitTask', SubmitTaskSchema);
