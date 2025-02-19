import React, { useState } from "react";

const trainingSessions = [
  { id: 1, title: "GIS Basics", date: "2024-03-01", status: "Upcoming" },
  { id: 2, title: "Remote Sensing Workshop", date: "2024-02-20", status: "Past" },
  { id: 3, title: "Surveying Techniques", date: "2024-03-10", status: "Upcoming" },
  { id: 4, title: "Geospatial Data Analysis", date: "2024-02-15", status: "Past" },
];

const Training = () => {
  const [search, setSearch] = useState("");

  // Filter training sessions based on search input
  const filteredSessions = trainingSessions.filter((session) =>
    session.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Training Sessions</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search training..."
        className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Training List */}
      <div className="space-y-4">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              className={`p-4 rounded-md shadow-md ${session.status === "Upcoming" ? "bg-green-100" : "bg-gray-100"
                }`}
            >
              <h3 className="text-lg font-semibold">{session.title}</h3>
              <p className="text-sm text-gray-600">Date: {session.date}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-md ${session.status === "Upcoming" ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                  }`}
              >
                {session.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No training sessions found.</p>
        )}
      </div>
    </div>
  );
};

export default Training;
