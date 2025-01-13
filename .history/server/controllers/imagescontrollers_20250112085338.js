export const allImages = async (req, res) => {
    try {
        const allImages = await Image.find({})
        if (!allImages) {
            res.status(404).json({ message: "No images found" })
        }

        res.status(200).json(allImages)
    } catch (error) {
        res.status(400).json(error.message)
    }
}