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

}