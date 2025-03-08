import { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        else if (hour < 18) return "Good afternoon";
        else return "Good evening";
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Unauthorized: No token found");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/auth/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch user info");
                }

                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 p-6">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{user ? `${getGreeting()}, Welcome Back${user.email}` : "Welcome Back"}</h2>

                {/* Loading Animation */}
                {loading && <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mx-auto my-4"></div>}

                {error && <p className="text-red-500 font-medium">{error}</p>}

                {user && (
                    <div className="flex flex-col items-center">
                        {/* User Profile Image */}
                        <img
                            src={user.avatar || "https://via.placeholder.com/100"}
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full shadow-md border-4 border-blue-500 mb-4"
                        />

                        {/* User Info */}
                        <h3 className="text-xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h3>
                        <p className="text-gray-600">{user.email}</p>

                        {/* Logout Button */}
                        <button
                            className="mt-6 flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.href = "/login";
                            }}
                        >
                            <FiLogOut className="text-lg" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
