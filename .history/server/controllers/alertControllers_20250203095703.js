import { Alert } from '../models/alertModel.js';

export const makeAlert = async (req, res) => {
    try {
        const { message, userId } = req.body;

        if (!message || !userId) {
            return res.status(400).json({ error: "Message and userId are required" });
        }

        const newAlert = new Alert({ message, user: userId });
        await newAlert.save();

        res.status(201).json({ message: "Alert created successfully", alert: newAlert });
    } catch (error) {
        console.error("Error creating alert:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const takeAlert = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const alerts = await Alert.find({ user: userId }).sort({ createdAt: -1 });
        return res.status(200).json({ message: "Alerts fetched successfully", alerts });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const alertCount = async (req, res) => {
    const { userId } = req.params;
    try {
        const count = await Alert.countDocuments({ user: userId });
        if (!count) {
            return res.status(404).json({ message: "No alerts found for this user" });
        }
        res.json({ count });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const getAlert = async (req, res) => {
    try {
        const alert = await Alert.find({});
        if (!alert) {
            return res.status(401).json({ message: "No alert found" });
        }
        res.status(200).json(alert);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

// DELETE ALERT FUNCTION
export const deleteAlert = async (req, res) => {
    try {
        const { alertId } = req.params;

        if (!alertId) {
            return res.status(400).json({ error: "Alert ID is required" });
        }

        const deletedAlert = await Alert.findByIdAndDelete(alertId);

        if (!deletedAlert) {
            return res.status(404).json({ message: "Alert not found" });
        }

        res.status(200).json({ message: "Alert deleted successfully", alert: deletedAlert });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
