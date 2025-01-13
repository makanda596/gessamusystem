import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
    quiz: {
        type: String,
        required: false,
    },

}, { timestamps: true })

export const Quiz = new mongoose.model("Quiz", quizSchema)