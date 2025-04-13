import mongoose from 'mongoose';

const MyprojectSchema = new mongoose.Schema({
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
    
   }
    image: {
        type: String
    },
    
});

export const Myproject = mongoose.model('Myproject', MyprojectSchema);
