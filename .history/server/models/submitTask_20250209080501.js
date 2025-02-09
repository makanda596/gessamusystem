import mongoose from 'mongoose';

const submitSchema = new mongoose.Schema({
    user: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'User',
           required: false,
       },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    title:{
        type: String,
        required: true
    },
    // taskId: {
    //     type: mongoose.Schema.Types.ObjectId,  // Reference to the associated task
    //     ref: 'Task',
    //     required: true
    // },
    status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Rejected', 'Approved'],  // Status of the submission
        default: 'Pending'
    }
    
});

export const Submission = mongoose.model('Submission', submitSchema);
