import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [details, setDetails] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchDetails = async () => {
        try {
            const response = await axios.get("https://gessamubackend.onrender.com/auth/profile", {
                withCredentials: true,
            });
            setDetails(response.data);
            console.log(response.data)
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
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
            <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
                <h1 className="text-5xl font-extrabold text-center mb-12 text-indigo-700">
                    Welcome to Your Dashboard
                </h1>

                {loading ? (
                    <p className="text-center text-gray-500 text-lg">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500 text-lg">{error}</p>
                ) : (
                    <div>
                        {/* Profile Card */}
                        <div className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-10 shadow-lg mb-12">
                            <div className="flex flex-wrap items-center space-x-8">
                                {/* Avatar */}
                                <img
                                    src={details.user.avatar}
                                    alt="User Avatar"
                                    className="w-32 h-32 rounded-full border-4 border-white"
                                />

                                {/* User Details */}
                                <div className="flex-1">
                                    <h2 className="text-4xl font-bold mb-2">
                                        {details?.user?.firstName || "N/A"} {details?.user?.lastName || "N/A"}
                                    </h2>
                                    <p className="text-lg">
                                        <span className="font-semibold">Admission No:</span> {details?.user?.admNo || "N/A"}
                                    </p>
                                    <p className="text-lg">
                                        <span className="font-semibold">Email:</span> {details?.user?.email || "N/A"}
                                    </p>
                                    <p className="text-lg">
                                        <span className="font-semibold">ID:</span> {details?.user?.id || "N/A"}
                                    </p>
                                    <p className="text-lg">
                                        <span className="font-semibold">Year:</span> {details?.user?.year || "N/A"}
                                    </p>
                                    <p className="text-lg">
                                        <span className="font-semibold">Phone:</span> {details?.user?.phoneNumber || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Dashboard Stats with Gradient Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-gradient-to-tr from-green-400 to-green-200 p-8 rounded-2xl shadow-md text-center">
                                <h3 className="text-xl font-semibold mb-2">Tasks Completed</h3>
                                <p className="text-3xl font-extrabold">12</p>
                            </div>
                            <div className="bg-gradient-to-tr from-blue-400 to-blue-200 p-8 rounded-2xl shadow-md text-center">
                                <h3 className="text-xl font-semibold mb-2">Projects Submitted</h3>
                                <p className="text-3xl font-extrabold">8</p>
                            </div>
                            <div className="bg-gradient-to-tr from-yellow-400 to-yellow-200 p-8 rounded-2xl shadow-md text-center">
                                <h3 className="text-xl font-semibold mb-2">Upcoming Deadlines</h3>
                                <p className="text-3xl font-extrabold">3</p>
                            </div>
                            <div className="bg-gradient-to-tr from-red-400 to-red-200 p-8 rounded-2xl shadow-md text-center">
                                <h3 className="text-xl font-semibold mb-2">New Messages</h3>
                                <p className="text-3xl font-extrabold"></p>
                            </div> 
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
