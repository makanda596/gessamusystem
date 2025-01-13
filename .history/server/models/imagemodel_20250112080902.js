import mongoose from "mongoose"

export const imageScheema = new mongoose.Schema({
    image: {
        type: String,
    }
})

export default Image = new mongoose.model("Image", imageScheema)