import mongoose from 'mongoose';

const submitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the user submitting the task
        ref: 'User',
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the associated task
        ref: 'Task',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Rejected', 'Approved'],  // Status of the submission
        default: 'Pending'
    }
    
}, { timestamps: true });

export const Submission = mongoose.model('Submission', submitSchema);
