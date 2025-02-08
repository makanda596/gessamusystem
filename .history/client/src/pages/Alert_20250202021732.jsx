import React, { useState, useEffect } from 'react';
import axios from 'axios'
const Alert = ({ userId }) => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/alert/takeAlert/${userId}`);
                setAlerts(response.data);
            } catch (error) {
                setError('An error occurred while fetching alerts');
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
    }, [userId]); // Trigger the effect when userId changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Your Alerts</h2>
            {alerts.length === 0 ? (
                <p>No alerts available</p>
            ) : (
                <ul>
                    {alerts.map((alert) => (
                        <li key={alert._id}>
                            {alert.message} - Status: {alert.status}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Alert;
