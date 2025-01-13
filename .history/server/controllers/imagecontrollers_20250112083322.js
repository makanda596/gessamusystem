import { Image } from "../models/imagemodel.js"

export const imageUpload = async (req, res, cb) => {
    try {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
        const result = await Image.create({ image: req.file.fieldname })
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error.message)
    }
}