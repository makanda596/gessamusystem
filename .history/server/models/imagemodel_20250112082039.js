import mongoose from "mongoose"

const imageScheema = new mongoose.Schema({
    image: {
        type: String,
    }
})

export default Image = new mongoose.model("Image", imageScheema)