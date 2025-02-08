import React, { useEffect, useState } from "react";
import axios from 'axios'
const Dashboard = () => {
    const [details, setDetails] = useState(null)
    const [error, setError] = useState("");

    //fetching the user details 
    const fetchDetails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/admDetails', {
                withCredentials: true
            })
            console.log(response.data)
            setDetails(response.data)
        } catch (error) {
            setError("you need to log in")
        }
    }

    useEffect(() => {
        fetchDetails()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-2/3 lg:w-1/2">
                <div className="flex items-center space-x-4">
                    {/* Profile Picture */}

                    {/* User Details */}
                    <div>
                        {/* <h1 className="text-2xl font-semibold">{user.firstName} {user.secondName}</h1> */}
                            {/* {user.admNo}</p> */}
                        {/* {/* <p className="text-gray-600">{user.email}</p> */}
                    </div> 
                </div>

                {/* More Content or Stats */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Dashboard</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        {/* Add more dashboard content like statistics, charts, etc. */}
                        <div className="bg-green-100 p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">Upcoming Tasks</h3>
                            <p className="text-gray-600">3 tasks due this week</p>
                        </div>
                        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">Recent Activity</h3>
                            <p className="text-gray-600">Completed 5 assignments</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;