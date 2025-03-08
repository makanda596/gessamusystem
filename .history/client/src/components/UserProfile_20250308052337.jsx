import axios from "axios";
import React, { useEffect, useState } from "react";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:5000/auth/profile"); // Adjust API route if needed
                setUser(response.data)
                console.log(response.data)
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
        <div>user={user}  <h1>{user.email}</h1>       </div>
    );
};

export default UserProfile;
