import mongoose from 'mongoose'

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
        type: [],
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
}, { timestamps: true })

export const weeklyProjects = new mongoose.model("weeklyProjects", weeklyProjectsSchema)
