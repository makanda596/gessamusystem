import mongoose, { model } from 'mongoose'

export const projectSchema = new mongoose.Schema({
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

export default Project = new mongoose.model("Project", projectSchema)