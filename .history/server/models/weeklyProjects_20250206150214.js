import mongoose from 'mongoose';

const weeklyProjectsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    trainer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reference: {
        type: [String],  // Change to an array of strings
        required: true
    },
    doc: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const weeklyProjects = mongoose.model("weeklyProjects", weeklyProjectsSchema);
