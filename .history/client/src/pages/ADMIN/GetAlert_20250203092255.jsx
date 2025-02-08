import React, { useEffect, useState } from "react";
import axios from "axios";

const GetAlert = () => {
    const [alerts, setAlerts] = useState([]);
    const [error, setError] = useState("");

    // Fetch alerts from API
    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/alert/getAlerts");
                setAlerts(response.data);
            } catch (err) {
                setError("Failed to fetch alerts.");
            }
        };

        fetchAlerts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Alerts</h2>

            {error && <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">{error}</div>}

            <div className="space-y-4">
                {alerts.length > 0 ? (
                    alerts.map((alert) => (
                        <div key={alert._id} className="bg-white shadow-md p-4 rounded-lg">
                            <p className="text-gray-800">{alert.message}</p>
                            <p className="text-sm text-gray-500">User ID: {alert.userId}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No alerts found.</p>
                )}
            </div>
        </div>
    );
};

export default GetAlert;
