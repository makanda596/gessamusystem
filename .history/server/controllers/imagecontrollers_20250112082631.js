import { Image } from "../models/imagemodel.js"

export const imageUpload = async (req, res) => {
    try {
        const result = await Image.create({ req.file })
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error.message)
    }
}