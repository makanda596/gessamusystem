import React, { useState, useEffect } from "react";
import axios from "axios";

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
        return <div className="text-center text-gray-600">Loading alerts...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600 font-semibold">{error}</div>;
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Your Alerts</h2>

            {alerts.length === 0 ? (
                <p className="text-gray-500 text-center">No alerts available</p>
            ) : (
                <ul className="space-y-4">
                    {alerts.map((alert) => (
                        <li key={alert._id} className={`p-4 rounded-md shadow-sm text-white ${getStatusColor(alert.status)}`}>
                            <p className="text-lg font-semibold">{alert.message}</p>
                            <p className="text-sm font-medium mt-1">{alert.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// Function to apply different colors based on alert status
const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case "urgent":
            return "bg-red-500"; // Red for urgent alerts
        case "pending":
            return "bg-yellow-500"; // Yellow for pending
        case "resolved":
            return "bg-green-500"; // Green for resolved
        default:
            return "bg-gray-500"; // Default gray
    }
};

export default Alert;
