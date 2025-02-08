
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
                const response = await axios.get(`http://localhost:5000/alert/takeAlert/${userId}`);
                console.log("Fetched Alerts:", response.data); // Debugging
                setAlerts(Array.isArray(response.data.alerts) ? response.data : response.data = []); // Ensure alerts is an array
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-600">Error: {error}</div>;
    }

    return (
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">Your Alerts</h2>
            {alerts.length === 0 ? (
                <p className="text-gray-500">No alerts available</p>
            ) : (
                <ul className="list-disc pl-5">
                    {alerts.map((alert) => (
                        <li key={alert._id} className="mb-1">
                            {alert.message} - <span className="font-bold">{alert.status}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Alert;
