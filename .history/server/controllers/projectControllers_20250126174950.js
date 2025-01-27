import { Project } from '../models/projectmodel.js'
export const postprojects = async (req, res) => {
    const { title, year, description } = req.body
    try {

        const doc = req.file ? req.file.filename : null;

        if (!doc) {
            return res.status(400).json({ message: "document file is required." });
        }

        // const doc = req.file ? req.file.filename : null;
        // if (!doc) {
        //     return res.status(400).json({ message: "Document file is required." });
        // }
        const allprojects = new Project({
            title,
            year,
            description,
            doc

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
    try {
        const { year } = req.query;
        if (!year) {
            return res.status(400).json({ message: "Year is missing or doesn't have any projects" });
        }
        const projects = await Project.find({ year }).sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

    // export const getprojects = async (req, res) => {
    //     try {

    //         const projects = await Project.find().sort({ createdAt: -1 });
    //         res.status(200).json(projects);
    //     } catch (error) {
    //         res.status(400).json(error.message);
    //     }
};


export const weeklyProjects = async (re, res) => {
    const { title, description, doc, date } = req.body

    try {
        const weeklyProjects = await Project.find({})
        if (!weeklyProjects) {
            return res.status(400).json({ message: "No projects found" })
        }

        await weeklyProjects.save()
        res.status(200).json({
            message: "project successfully created",
            weeklyProjects: {
                title,
                description,
                doc,
                date
            }
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}