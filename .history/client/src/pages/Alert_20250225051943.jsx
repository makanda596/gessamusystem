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

        axios.get(`https://gessamubackend.onrender.com/alert/takeAlert/${userId}`)
            .then(response => setAlerts(response.data.alerts))
            .catch(err => setError(err.response?.data?.message || "An error occurred while fetching alerts"))
            .finally(() => setLoading(false));
    }, [userId]);

    if (loading) return <Loader />;
    if (error) return <Message text={error} color="text-red-600" />;

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">📢 Your Alerts</h2>
                {alerts.length === 0 ? (
                    <Message text="No alerts available" color="text-gray-500" />
                ) : (
                    <ul className="space-y-4">
                        {alerts.map(({ _id, message, status }) => (
                            <AlertItem key={_id} message={message} status={status} />
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

const Loader = () => (
    <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-red-600 border-b-green-600 border-l-white border-r-white rounded-full animate-spin"></div>
    </div>
);

const Message = ({ text, color }) => (
    <div className={`flex justify-center items-center h-32 font-semibold text-lg ${color}`}>{text}</div>
);

const AlertItem = ({ message, status }) => (
    <li className={`p-4 flex items-center space-x-4 rounded-md shadow-md hover:scale-105 transition-all ${getStatusColor(status)}`}>
        {getStatusIcon(status)}
        <div>
            <p className="text-lg font-semibold">{message}</p>
            <p className="text-sm font-medium mt-1">{status}</p>
        </div>
    </li>
);

const getStatusColor = (status) => {
    const colors = {
        urgent: "bg-red-500 text-white",
        pending: "bg-yellow-500 text-black",
        resolved: "bg-green-500 text-white",
    };
    return colors[status.toLowerCase()] || "bg-gray-500 text-white";
};

const getStatusIcon = (status) => {
    const icons = {
        urgent: <FaExclamationCircle className="text-2xl text-white" />,
        pending: <FaClock className="text-2xl text-black" />,
        resolved: <FaCheckCircle className="text-2xl text-white" />,
    };
    return icons[status.toLowerCase()] || <FaExclamationCircle className="text-2xl text-white" />;
};

export default Alert;
