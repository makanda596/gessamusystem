import { Submission } from "../models/submitTask.js"
import { Task } from "../models/taskmodel.js"

export const makeTask = async (req, res) => {
    const { task, description, date, level } = req.body

    try {

        const newtask = new Task({
            task, description, date, level
        })
        await newtask.save()
        res.status(200).json({ message: "task already sent", newtask })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const takeTask = async (req, res) => {
    try {
        const tasks = await Task.find({}).sort({ createdAt: -1 })
        if (!tasks) {
            res.status(400).json({ message: "no Tasks found" })
        }

        res.status(200).json(tasks)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

export const task = async (req, res) => {
    const { id } = req.params

    try {
        const task = await Task.findOne({ _id: id })
        if (!task) {
            res.status(400).json({ message: "no task found " })
        }

        res.status(200).json(task)
    } catch (error) {
        res.status(400).json(error.message)
    }
}


export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndDelete({ _id: id });

        if (!task) {
            return res.status(404).json({ message: "No task found" });
        }

        res.status(200).json({ message: "Task deleted successfully", task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const submitTask = async (req, res) => {
    const {id} = req.params;  // Assume user information is stored in req.user after authentication middleware
    const {title} = req.body
    try {
        if (!id || !title) {
            return res.status(400).json({ message: "User ID and Task ID are required." });
        }

        const newSubmission = new Submission({
            id,
            // taskId,
            title
        });

        await newSubmission.save();

       return res.status(201).json({ message: "Submission created successfully", submission: newSubmission });
    } catch (error) {
        console.error("Error creating submission:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const getSubmittedTask = async (req, res) => {
    try {
        const submittedTasks = await Submission.find({}).sort({ createdAt: -1 });

        if (!submittedTasks || submittedTasks.length === 0) {
            return res.status(400).json({ message: "No submitted tasks found" });
        }

        res.status(200).json(submittedTasks);
    } catch (error) {
        console.error("Error fetching submitted tasks:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
