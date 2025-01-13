import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    doc: {
        type: String,
        required: false
    },
    year: {
        type: Number,
        required: true
    },
}, { timestamps: true })

export const Project = new mongoose.model("Project", projectSchema)