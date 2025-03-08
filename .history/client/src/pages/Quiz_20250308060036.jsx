import React, { useEffect, useState } from "react";
import axios from 'axios'
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: No token found");
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

        setUser(data);;
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserInfo();
  }, []);



  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-semibold">User Profile</h1>
      <p>{user ? (<p>user.email</p> ) : (<p>no</p>)}</p>
    </div>
  );
};

export default Dashboard;
