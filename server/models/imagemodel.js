import mongoose from "mongoose"

const imageScheema = new mongoose.Schema({
    image: {
        type: String,
    }
}, { timestamps: true })

export const Image = new mongoose.model("Image", imageScheema)