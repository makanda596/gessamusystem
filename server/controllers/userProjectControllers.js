import { User } from "../models/Usermodel.js"
import dotenv from 'dotenv'
import { Userproject } from "../models/Userproject.js";
import cloudinary from "../utilis/cloudinary.js";

dotenv.config();



export const submitProject = async (req, res) => {
    const userId = req.user.id
    const {title,image,description, resources} = req.body
    try {
        if ( !title) {
            return res.status(400).json({ message: " a title and an image is required" });
        }
        const reponse = await cloudinary.uploader.upload(image)
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({message:"please log in again or refresh the page"})
        }
        const newSubmission = new Userproject({
            title ,userId, resources,description,image:reponse.secure_url
        });

        user.myprojects.push(newSubmission._id)
        await user.save()
        await newSubmission.save();

        //add an email after one submits a task

       return res.status(201).json({ message: "Submission created successfully", submission: newSubmission });
    } catch (error) {
        console.error("Error creating submission:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const takeProject = async (req, res) => {
    const {id} = req.params
    try {
        const project = await Userproject.findById(id).sort({createdAt: -1 }).populate("userId", "email avatar firstName lastName")
        if (!project) {
            res.status(400).json({ message: "no projects  found" })
        }

        res.status(200).json(project)
    } catch (error) {
        res.status(404).json(error.message)
    }
}


 
export const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Userproject.findByIdAndDelete({ _id: id });

        if (!project) {
            return res.status(404).json({ message: "No task found" });
        }

        res.status(200).json({ message: "Task deleted successfully", project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





export const getUserProject = async (req, res) => {
    try {
        const userProjects = await Userproject.find({ userId :req.user.id }).sort({ submittedAt: -1 });

        if (!userProjects ) {
            return res.status(400).json({ message: "No submitted tasks found" });
        }

        res.status(200).json(userProjects);
    } catch (error) {
        console.error("Error fetching submitted tasks:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



export const countUserProject = async (req,res)=>{
    const userId = req.user.id
    try {
        const count = await Userproject.countDocuments({userId:userId }) 
        if(!count){
            return res.status(400).json({message:"no count"})
        }
        res.json(count)
    } catch (error) {
        console.error("Error fetching submitted tasks counts:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export const deleteUserProject = async (req, res) => {
    const { postId } = req.params;

    try {
        const project = await Userproject.findOneAndDelete({
            _id: postId,
            userId: req.user.id,
        });

        if (!project) {
            return res.status(404).json({ message: "Project does not exist or you don't have permission to delete it." });
        }

        return res.status(200).json({ message: "Project deleted successfully." });
    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({ message: "An error occurred while deleting the project." });
    }
};

export const getAllProject = async (req, res) => {
    try {
        const projects = await Userproject.find({}).sort({ submittedAt: -1 }).populate("userId", "email avatar firstName lastName");

        if (!projects) {
            return res.status(400).json({ message: "No submitted tasks found" });
        }

        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching submitted tasks:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
