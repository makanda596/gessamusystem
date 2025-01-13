import { Image } from "../models/Imagemode.js"

export const imageUpload = async (req, res) => {
    try {
        const result = await Image.create({ image: req.file.filename })
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error.message)
    }
}