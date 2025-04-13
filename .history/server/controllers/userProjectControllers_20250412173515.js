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


export const takeProject = async (req, res) => {
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

// export const task = async (req, res) => {
//     const { id } = req.params

//     try {
//         const task = await Task.findOne({ _id: id })
//         if (!task) {
//             res.status(400).json({ message: "no task found " })
//         }

//         res.status(200).json(task)
//     } catch (error) {
//         res.status(400).json(error.message)
//     }
// }

 
export const deleteProject = async (req, res) => {
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
export const submitProject = async (req, res) => {
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


export const getUserProject = async (req, res) => {
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



export const countUserProject = async (req,res)=>{
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