import { Alert } from "../models/alertModel.js";
import {  SubmitTask } from "../models/submitTask.js"
import { Task } from "../models/taskmodel.js"
import { User } from "../models/Usermodel.js"
import cloudinary from "cloudinary";
import dotenv from 'dotenv'

dotenv.config();


cloudinary.v2.config({
    cloud_name: "db5pgr14l",
    api_key: "419672131612681",
    api_secret: "X6bdb7zw9Gae9IvWahEyzT9nB1o",
});

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

        res.status(200).json({ message: " Tasks found" ,tasks })
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


// export const getOneSubmittedTask = async (req,res)=>{
//     const {id} = req.params
//     try {
//         const getTask = await Task.findOne
//     } catch (error) {
        
//     }
// }
export const submitTask = async (req, res) => {
    const userId = req.user.id
    const {title,image} = req.body
    try {
        if ( !title) {
            return res.status(400).json({ message: " a title and an image is required" });
        }
        const reponse = await cloudinary.v2.uploader.upload(image)
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({message:"please log in again or refresh the page"})
        }
        const newSubmission = new SubmitTask({
            title ,userId,image:reponse.secure_url
        });

        user.submittedtasks.push(newSubmission._id)
        await user.save()
        await newSubmission.save();

        //add an email after one submits a task

       return res.status(201).json({ message: "Submission created successfully", submission: newSubmission });
    } catch (error) {
        console.error("Error creating submission:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const getUserSubmittedTask = async (req, res) => {
    try {
        const submittedTasks = await SubmitTask.find({ userId :req.user.id , status:"pending"}).sort({ submittedAt: -1 });

        if (!submittedTasks ) {
            return res.status(400).json({ message: "No submitted tasks found" });
        }

        res.status(200).json(submittedTasks);
    } catch (error) {
        console.error("Error fetching submitted tasks:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const getUserCompletedTask = async (req, res) => {
    const userId = req.user.id

    try {
        const completedTask = await SubmitTask.findOne({ userId:userId, status:"completed"}).sort({ submittedAt: -1 });

        if (!completedTask) {
            return res.status(400).json({ message: "No completedTask   found" });
        }

        
        res.status(200).json(completedTask);
    } catch (error) {
        console.error("Error fetching submitted tasks:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const countUserTask = async (req,res)=>{
    const userId = req.user.id
    try {
        const count = await SubmitTask.countDocuments({userId:userId }) 
        if(!count){
            return res.status(400).json({message:"no count"})
        }
        res.json(count)
    } catch (error) {
        console.error("Error fetching submitted tasks counts:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
export const countUserCompletedTask = async (req, res) => {
    const userId = req.user.id
    try {
        const count = await SubmitTask.countDocuments({ userId: userId , status:"completed" })
        if (!count) {
            return res.status(400).json({ message: "no count" })
        }
        res.json(count)
    } catch (error) {
        console.error("Error fetching submitted tasks counts:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}



export const toggleonetask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await SubmitTask.findOne({ _id: id, status: "pending" });
        if (!task) {
            return res.json({ message: "The task is either not found or already being assessed." });
        }

        task.status = "completed";
        await task.save();

        const newNotification = new Alert({
            userId: task.userId, 
            message: `Your task titled "${task.title}" has been marked as completed.`,
           
        });
        await newNotification.save();

        res.json({ message: "Task status updated to completed and notification sent.", task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSubmittedTask = async (req, res) => {
    try {
        const submittedTasks = await SubmitTask.find({}).sort({ submittedAt: -1 });

        if (!submittedTasks || submittedTasks.length === 0) {
            return res.status(400).json({ message: "No submitted tasks found" });
        }

        res.status(200).json(submittedTasks);
    } catch (error) {
        console.error("Error fetching submitted tasks:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// export const deleteTask = async (req,res)=>{
//     const {id} = req.params
//     try {
//         const existingId = await Task.findById({id})
//         if(!existingId){
//             res.status(400).json({message:"no such task found"})
//         } 
//         await existingId.save()
//         res.status(200).json({message:'task deleted successfully'})
//     } catch (error) {
//         res.status(400).json(error.message)
//     }
// }