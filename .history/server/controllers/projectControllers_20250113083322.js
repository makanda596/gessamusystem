import { Project } from '../models/projectmodel.js'
export const postprojects = async (req, res) => {
    const { title, year, description } = req.body
    try {
        const image = req.file ? req.file.[0].filename : null;
        if (!image) {
            return res.status(400).json({ message: "Image file is required." });
        }

        // const doc = req.file ? req.file.filename : null;
        // if (!doc) {
        //     return res.status(400).json({ message: "Document file is required." });
        // }
        const allprojects = new Project({
            title,
            year,
            description,
            image

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
        const { year } = req.body;
        if (!year) {
            return res.status(400).json({ message: "Year is doesnt have any projects" });
        }
        const projects = await Project.find({ year }).sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json(error.message);
    }
};
