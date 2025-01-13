import { Project } from '../models/projectmodel.js'
export const postprojects = async (req, res) => {
    const { title, year, description } = req.body
    try {
        const image = req.files?.image?.[0]?.filename; // Assuming you're uploading multiple files
        const doc = req.files?.doc?.[0]?.filename;

        // Ensure files are uploaded
        if (!image || !doc) {
            return res.status(400).json({ message: "Both image and doc files are required." });
        }
        const allprojects = new Project({
            title,
            year,
            description,
            image,
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
