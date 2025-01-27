import { Project } from '../models/projectmodel.js'
import { weeklyProjects } from '../models/weeklyProjects.js';
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
        res.status(200).json({
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


export const weeklyProject = async (req, res) => {
    const { title, trainer, description, date } = req.body

    try {
        if (!title || !trainer || !description || !date) {
            return res.status(400).json({
                message: "All fields (title, trainer, description, and date) are required.",
            });
        }
        const doc = req.file ? req.file.filename : null;

        if (!doc) {
            return res.status(400).json({ message: "document file is required." });
        }
        const midProjects = weeklyProjects({
            title,
            trainer,
            description,
            doc,
            date
        })
        await midProjects.save()
        res.status(200).json({
            message: "project successfully created",
            midProjects
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const getweeklyProjects = async (req, res) => {
    try {
        const midProjects = await weeklyProjects.find({})
        if (!midProjects) {
            return res.status(400).json({ message: "no weekly projects found" })
        }
        res.status(200).json(midProjects)
    } catch (error) {
        res.status(500).json(error.message)
    }
}