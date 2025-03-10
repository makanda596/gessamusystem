import { Alert } from '../models/alertModel.js';
import { AllAlert } from '../models/allAlerts.js';

export const makeAlert = async (req, res) => {
    try {
        const { message, id } = req.body;

        if (!message ) {
            return res.status(400).json({ error: "Message  are required" });
        } 

        const newAlert = new Alert({ message, _id: id });
        await newAlert.save();

       return res.status(201).json({ message: "Alert created successfully", alert: newAlert });
    } catch (error) {
        console.error("Error creating alert:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const takeAlert = async (req, res) => {
    try {
        const {id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const alerts = await Alert.find({ _id:id}).sort({ createdAt: -1 });
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
        const alert = await Alert.find({}).sort({createdAt:-1});
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
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Alert ID is required" });
        }

        const deletedAlert = await Alert.findByIdAndDelete(id);

        if (!deletedAlert) {
            return res.status(404).json({ message: "Alert not found" });
        }

        res.status(200).json({ message: "Alert deleted successfully", alert: deletedAlert });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// //posting all alerts 
// export const allalert = async (req, res) => {
//     try {
//         const { message} = req.body;

//         if (!message) {
//             return res.status(400).json({ error: "Message and userId are required" });
//         }

//         const newAlert = new AllAlert({ message});
//         await newAlert.save();

//         return res.status(201).json({ message: "Alert created successfully", newAlert });
//     } catch (error) {
//         console.error("Error creating alert:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// export const getAllAlert = async (req, res) => {
//     try {
//         const alert = await Alert.find({}).sort({ createdAt: -1 });
//         if (!alert) {
//             return res.status(401).json({ message: "No alert found" });
//         }
//         res.status(200).json(alert);
//     } catch (error) {
//         res.status(400).json(error.message);
//     }
// };