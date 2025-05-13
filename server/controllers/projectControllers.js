import { Project } from '../models/projectmodel.js'
import { weeklyProjects } from '../models/weeklyProjects.js';
import dotenv from 'dotenv'

dotenv.config();


export const postprojects = async (req, res) => {
    const { title, year, description, reference } = req.body
    try {
        const allprojects = new Project({
            title,
            year,
            description,
            reference,

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

   
};




export const weeklyProject = async (req, res) => {
    const { title, trainer, description, reference, date ,image} = req.body;

    try {
        if (!title || !trainer || !description || !date) {
            return res.status(400).json({ message: "All fields except references and doc are required." });
        } 

        const doc = req.file ? req.file.filename : null;
        if (!doc) {
            return res.status(400).json({ message: "Document file is required." });
        }

        const newProject = new weeklyProjects({
            title,
            trainer,
            description,
            reference,
            // reference2,
            // reference3,
            doc,
            date,
        });

        await newProject.save();

        res.status(201).json({
            message: "Project successfully created",
            project: newProject,
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const getweeklyProjects = async (req, res) => {
    try {
        const midProjects = await weeklyProjects.find({}).sort({ createdAt: -1 })
        if (!midProjects) {
            return res.status(400).json({ message: "no weekly projects found" })
        }
        res.status(200).json(midProjects)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const project = async (req, res) => {
    const { id } = req.params

    try {
       
        const weekly = await weeklyProjects.findOne({ _id: id })
        if (!weekly) {
            return res.status(400).json({ message: "no weekly project found " })
        }
        res.status(200).json(weekly)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const getAllProjects = async (req, res) => {
    try {
        const allProjects = await Project.find({}).sort({ createdAt: -1 })
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const deleteProject = async (req, res) => {
    const { id } = req.params
    try {
        const project = await Project.findByIdAndDelete(id)
        if (!project) {
            return res.status(404).json({ message: 'Project not found' })
        }
        // await project.save()
        res.status(200).json({ message: 'Project deleted', project })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const countWeeklyProjects = async (req, res) => {
    try {
        const count = await weeklyProjects.countDocuments()
        res.json({ count })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const countProjects = async (req, res) => {
    try {
        const count = await Project.countDocuments()
        res.json({ count })
    } catch (error) {
        res.status(404).json(error.message)
    }
} 