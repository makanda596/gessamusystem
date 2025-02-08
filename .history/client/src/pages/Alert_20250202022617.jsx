import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Alert = ({ userId }) => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/alert/takeAlert/${userId}`);
                setAlerts(response.data); // Set alerts in state
            } catch (error) {
                setError('An error occurred while fetching alerts'); // Update error state
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
    }, [userId]); // Trigger effect when userId changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
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
