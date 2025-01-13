import { Project } from '../models/projectmodel.js'
export const postprojects = async (req, res) => {
    const { title, year } = req.body
    try {
        const allprojects = new Project({
            title,
            year,
        })
        await allprojects.save()
        res.status(400).json({
            message: "project successfully created",
            allprojects
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const getprojects = async (req, res) => {
    const year = req.User.year
    try {
        const projects = await Project.find({ year }); // Fetch projects for that year
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json(error.message)
    }
}