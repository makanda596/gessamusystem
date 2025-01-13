import { Image } from "../models/imagemodel.js"

export const allImages = async (req, res) => {
    try {
        const allImages = await Image.find({}).sort({ createdAt: -1 })
        if (!allImages) {
            res.status(404).json({ message: "No images found" })
        }

        res.status(200).json(allImages)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const oneImage = async (req, res) => {
    const { id } = req.params
    try {
        const image = await Image.findOne({ _id: id })
        if (!image) {
            res.status(404).json({ message: "No image found with that ID" })

        }
        res.status(200).json(image)
    } catch (error) {

    }
}