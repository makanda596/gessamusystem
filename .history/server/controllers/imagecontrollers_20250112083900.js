import { Image } from "../models/imagemodel.js"
import path from 'path';
export const imageUpload = async (req, res, cb) => {
    try {
        // Math.round(Math.random() * 1E9
        const uniqueSuffix = Date.now() + '-' + path.extname(originalname)
        const result = await Image.create({ image: req.file.fieldname + '-' + uniqueSuffix })
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error.message)
    }
}