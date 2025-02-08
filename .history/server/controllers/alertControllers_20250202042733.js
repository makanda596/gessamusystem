import { Alert } from '../models/alertModel.js'
export const makeAlert = async (req, res) => {
    try {
        const { message, userId } = req.body; // Get data from request body

        // Validate required fields
        if (!message || !userId) {
            return res.status(400).json({ error: "Message and userId are required" });
        }

        // Create a new alert document
        const newAlert = new Alert({
            message,
            user: userId
        });

        // Save to the database
        await newAlert.save();

        res.status(201).json({ message: "Alert created successfully", alert: newAlert });
    } catch (error) {
        console.error("Error creating alert:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const takeAlert = async (req, res) => {
    try {
        const { userId } = req.params; // Get user ID from request parameters

        // Validate userId
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const alerts = await Alert.find({ user: userId }).sort({ createdAt: -1 }); // Sort by latest

        return res.status(200).json({ message: "Alerts fetched successfully", alerts });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const alertCount = async (req,res)=>{
    try{
        const count = await Alert.countDocuments()
        res.json({count})
    }
    catch(error){
        res.status(400).json(error.message)
    }
}