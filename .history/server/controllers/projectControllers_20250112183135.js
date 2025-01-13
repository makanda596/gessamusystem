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

// export const getprojects = async (req, res) => {
//     try {
//         const { year } = req.body; // Get the year from the request body
//         if (!year) {
//             return res.status(400).json({ message: "Year is doesnt have any projects" });
//         }
//         const projects = await Project.find({ year }); // Fetch projects for that year
//         res.status(200).json(projects);
//     } catch (error) {
//         res.status(400).json(error.message);
//     }
// };
// Middleware to simulate user authentication (for example)

// Fetch projects for the user's year of study
