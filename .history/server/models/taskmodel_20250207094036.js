import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    completed: { type: Boolean, default: false, type: String },

}, { timestamps: true })

export const Task = new mongoose.model("Task", taskSchema)