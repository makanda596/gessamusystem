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

    doc: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Project = new mongoose.model("Project", projectSchema)