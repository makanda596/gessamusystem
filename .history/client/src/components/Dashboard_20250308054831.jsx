import React, { useEffect, useState } from "react";
import axios from 'axios'
const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);


    if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-semibold">User Profile</h1>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
};

export default UserProfile;
