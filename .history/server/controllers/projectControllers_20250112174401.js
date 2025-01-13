
export const postprojects = async (req, res) => {
    const { title, year } = req.body
    try {
        const allprojects = new Project({
            title,
            year,
        })
        await allprojects.save()
        res.status(400).json(allprojects)
    } catch (error) {
        res.status(400).json(error.message)
    }
}