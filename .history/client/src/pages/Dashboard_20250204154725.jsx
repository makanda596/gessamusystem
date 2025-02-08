import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [details, setDetails] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchDetails = async () => {
        try {
            const response = await axios.get("http://localhost:5000/auth/profile", {
                withCredentials: true,
            });
            setDetails(response.data);
        } catch (error) {
            setError("You need to log in to access the dashboard.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-6">
            <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center mb-10 text-indigo-600">Welcome to Your Dashboard</h1>

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div>
                        {/* Full-width Profile Card */}
                        <div className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-8 shadow-md mb-10">
                            <div className="flex flex-wrap items-center space-x-6">
                                {/* Avatar */}
                                <img
                                    src={details?.user.avatar || "https://via.placeholder.com/100"}
                                    alt="User Avatar"
                                    className="w-24 h-24 rounded-full border-4 border-white mb-4 sm:mb-0"
                                />
                                {/* <div className="flex-1">
                                    <h2 className="text-3xl font-bold mb-2">
                                        {details.user.firstName || "N/A"} {details.user.lastName || "N/A"}
                                    </h2>
                                    <p><span className="font-semibold">Admission No:</span> {details.user.admNo || "N/A"}</p>
                                    <p><span className="font-semibold">Email:</span> {details.user.email}</p>
                                    <p><span className="font-semibold">Year:</span> {details.user.year || "N/A"}</p>
                                    <p><span className="font-semibold">Phone:</span> {details.user.phoneNumber || "N/A"}</p>
                                </div> */}
                            </div>
                        </div>

                        {/* Dashboard Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-green-100 p-8 rounded-lg shadow-md text-center">
                                <h3 className="text-lg font-semibold">Tasks Completed</h3>
                                <p className="text-2xl font-bold">12</p>
                            </div>
                            <div className="bg-blue-100 p-8 rounded-lg shadow-md text-center">
                                <h3 className="text-lg font-semibold">Projects Submitted</h3>
                                <p className="text-2xl font-bold">8</p>
                            </div>
                            <div className="bg-yellow-100 p-8 rounded-lg shadow-md text-center">
                                <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
                                <p className="text-2xl font-bold">3</p>
                            </div>
                            <div className="bg-red-100 p-8 rounded-lg shadow-md text-center">
                                <h3 className="text-lg font-semibold">New Messages</h3>
                                <p className="text-2xl font-bold">5</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
