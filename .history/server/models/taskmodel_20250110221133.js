import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: false,
    },

}, { timestamps: true })

export const Task = new mongoose.model("Task", taskSchema)