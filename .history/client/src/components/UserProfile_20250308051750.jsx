import React, { useEffect, useState } from "react";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:5000/auth/profile"); // Adjust API route if needed
                const data = await response.json();

                if (response.ok) {
                    setUser(data);
                } else {
                    setError(data.message || "Failed to fetch user info");
                }
            } catch (err) {
                setError("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <p className="text-center mt-5">Loading user data...</p>;
    if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">User Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default UserProfile;
