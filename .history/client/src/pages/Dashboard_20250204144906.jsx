import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch user details
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
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Your Dashboard</h1>
        
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col items-center">
            {/* Profile Card */}
            <div className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-6 shadow-md mb-6">
              <h2 className="text-2xl font-bold mb-2">User Information</h2>
              <p><span className="font-semibold">Name:</span> {details.user.name || "N/A"}</p>
              <p><span className="font-semibold">Email:</span> {details.user.email}</p>
              <p><span className="font-semibold">Role:</span> {details.user.role || "User"}</p>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold">Tasks Completed</h3>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold">Projects Submitted</h3>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="bg-yellow-100 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="bg-red-100 p-6 rounded-lg shadow-md text-center">
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
