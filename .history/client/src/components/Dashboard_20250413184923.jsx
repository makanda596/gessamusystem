import { useState, useEffect } from "react";
import axios from 'axios';
import { useAuthStore } from "../store/auth";
import TaskCount from "./taskCount";
import UserProjectCount from "./userProjectCount";
import { FiAlertCircle, FiCheckCircle, FiClock, FiUser } from "react-icons/fi";

const Dashboard = () => {
    const [error, setError] = useState();
    const { fetchUserInfo, user } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const [alerts, setAlerts] = useState([]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning ";
        else if (hour < 18) return "Good afternoon ";
        else return "Good evening ";
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchUserInfo();
                if (user?._id) {
                    const response = await axios.get(`${import.meta.env.BACKEND_URL}/alert/countAlert/${user._id}`);
                    setAlerts(response.data);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [user?._id]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600"></div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Header Section */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="relative">
                                    <img
                                        src={user.avatar || "https://via.placeholder.com/150"}
                                        alt="User Avatar"
                                        className="w-24 h-24 rounded-full border-4 border-white shadow-xl"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-purple-600 text-white p-1.5 rounded-full">
                                        <FiUser className="text-lg" />
                                    </div>
                                </div>

                                <div className="text-center md:text-left">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                        {getGreeting()}
                                    </h1>
                                    <p className="text-gray-600 mt-1">{user?.firstName} {user?.lastName}</p>
                                    <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Projects Card */}
                            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <FiCheckCircle className="text-blue-600 text-2xl" />
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-sm">Total Projects</span>
                                        <UserProjectCount className="text-2xl font-bold text-gray-800" />
                                    </div>
                                </div>
                            </div>

                            {/* Tasks Card */}
                            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-100 p-3 rounded-lg">
                                        <FiClock className="text-green-600 text-2xl" />
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-sm">Tasks Completed</span>
                                        <TaskCount className="text-2xl font-bold text-gray-800" />
                                    </div>
                                </div>
                            </div>

                            {/* Alerts Card */}
                            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="bg-red-100 p-3 rounded-lg">
                                        <FiAlertCircle className="text-red-600 text-2xl" />
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-sm">Pending Alerts</span>
                                        <p className="text-2xl font-bold text-gray-800">{alerts.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Section */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                            <div className="space-y-4">
                                {alerts.length > 0 ? (
                                    alerts.map((alert, index) => (
                                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                            <FiAlertCircle className="text-yellow-500" />
                                            <p className="text-gray-600">{alert.message}</p>
                                            <span className="text-sm text-gray-500 ml-auto">
                                                {new Date(alert.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No recent alerts
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;