import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaExclamationCircle, FaCheckCircle, FaClock } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Alert = ({ userId }) => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setError("User ID is missing.");
            setLoading(false);
            return;
        }

        const fetchAlerts = async () => {
            try {
                const response = await axios.get(`https://gessamubackend.onrender.com/alert/takeAlert/${userId}`);
                setAlerts(response.data.alerts);
            } catch (err) {
                console.error("Error fetching alerts:", err.response?.data || err.message);
                setError(err.response?.data?.message || "An error occurred while fetching alerts");
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
    }, [userId]);

    if (loading) {
        return <div className="flex justify-center items-center h-32 text-gray-600 text-lg font-medium">Loading alerts...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-32 text-red-600 font-semibold text-lg">{error}</div>;
    }

    return (
        <>
        <Navbar/>
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">📢 Your Alerts</h2>

            {alerts.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">No alerts available</p>
            ) : (
                <ul className="space-y-4">
                    {alerts.map((alert) => (
                        <li
                            key={alert._id}
                            className={`p-4 flex items-center space-x-4 rounded-md shadow-md transition-all transform hover:scale-105 ${getStatusColor(alert.status)}`}
                        >
                            {getStatusIcon(alert.status)}
                            <div>
                                <p className="text-lg font-semibold">{alert.message}</p>
                                <p className="text-sm font-medium mt-1">{alert.status}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </>
    );
};

// Function to apply different colors based on alert status
const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case "urgent":
            return "bg-red-500 text-white"; // Red for urgent alerts
        case "pending":
            return "bg-yellow-500 text-black"; // Yellow for pending
        case "resolved":
            return "bg-green-500 text-white"; // Green for resolved
        default:
            return "bg-gray-500 text-white"; // Default gray
    }
};

// Function to return different icons based on alert status
const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
        case "urgent":
            return <FaExclamationCircle className="text-2xl text-white" />;
        case "pending":
            return <FaClock className="text-2xl text-black" />;
        case "resolved":
            return <FaCheckCircle className="text-2xl text-white" />;
        default:
            return <FaExclamationCircle className="text-2xl text-white" />;
    }
};

export default Alert;
