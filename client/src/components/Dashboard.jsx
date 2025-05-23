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
                        <div className="bg-white rounded-2xl p-4 shadow-lg">
                            <div className="flex flex-col md:flex-row items-center gap-3">
                                <div className="relative">
                                    <img
                                        src={user.avatar || "https://via.placeholder.com/150"}
                                        alt="User Avatar"
                                        className="w-24 h-24 rounded-full border-4 border-white shadow-xl"
                                    />
                                   
                                </div>

                                <div className="text-center md:text-left">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                        {getGreeting()}
                                    </h1>
                                    <p className="text-gray-600 mt-1">{user?.firstName} {user?.lastName}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-4">
                                  
                                        <UserProjectCount className="text-xl font-bold text-gray-800" />
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                                                     <TaskCount className="text-2xl font-bold text-gray-800" />
                                 
                            </div>

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

                     
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;