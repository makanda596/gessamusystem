import React from "react";

const Dashboard = () => {
    const user = {
        firstName: "John",
        secondName: "Doe",
        email: "john.doe@example.com",
        year: "Year 2", // Change this as needed
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-2/3 lg:w-1/2">
                <div className="flex items-center space-x-4">
                    {/* Profile Picture */}


                    {/* User Details */}
                    <div>
                        <h1 className="text-2xl font-semibold">{user.firstName} {user.secondName}</h1>
                        <p className="text-gray-600">admno{user.admNo}</p>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-gray-600">{user.year}</p>
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
