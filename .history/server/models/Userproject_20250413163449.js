import mongoose from 'mongoose';

const UserprojectSchema = new mongoose.Schema({
   userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  
    title:{
        type: String,
        required: true
    },
   description:{
    type:String,
    required:true
   },
   resources:{
    type:String,
    
   },
    image: {
        type: String
    },
    email:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    
},{timestamps:true});

export const Userproject = mongoose.model('Userproject', UserprojectSchema);
