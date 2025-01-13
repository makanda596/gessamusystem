import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // description:{
    //     type: String,
    //     required: true
    // },
    year: {
        type: Number,
        required: true
    },


})

export const Project = new mongoose.model("Project", projectSchema)
export const Project = new mongoose.model("Project", projectSchema)