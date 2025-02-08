import React, { useEffect, useState } from "react";
import axios from "axios";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const alertColors = {
    success: "bg-green-100 border-green-500 text-green-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    error: "bg-red-100 border-red-500 text-red-700",
};

const GetAlert = () => {
    const [alerts, setAlerts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/alert/getAlert");
                setAlerts(response.data);
            } catch (err) {
                setError("Failed to fetch alerts.");
            }
        };

        fetchAlerts();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-6">
            <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">📢 Latest Alerts</h2>

            {error && (
                <div className="bg-red-500 text-white p-3 rounded-md text-center mb-4">
                    <XCircle className="inline-block w-5 h-5 mr-2" />
                    {error}
                </div>
            )}

            <div className="space-y-4 max-w-2xl mx-auto">
                {alerts.length > 0 ? (
                    alerts.map((alert, index) => {
                        const alertType = alert.type || "warning"; // Default to warning if no type is given
                        return (
                            <div
                                key={alert._id}
                                className={`border-l-4 p-4 rounded-lg shadow-md ${alertColors[alertType]} hover:shadow-lg transition-all`}
                            >
                                <div className="flex items-center gap-3">
                                    {alertType === "success" && <CheckCircle className="text-green-500 w-6 h-6" />}
                                    {alertType === "warning" && <AlertTriangle className="text-yellow-500 w-6 h-6" />}
                                    {alertType === "error" && <XCircle className="text-red-500 w-6 h-6" />}

                                    <div>
                                        <p className="font-semibold text-lg">{alert.message}</p>
                                        <p className="text-sm text-gray-600">User ID: {alert.userId}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-500">No alerts found.</p>
                )}
            </div>
        </div>
    );
};

export default GetAlert;
