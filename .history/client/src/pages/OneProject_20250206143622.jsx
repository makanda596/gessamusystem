import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OneProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProject = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/projects/oneproject/${id}`);
      setProject(response.data);
    } catch (err) {
      setError("Failed to load project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-500">
        {error}
      </div>
    );
  }

  const recommendedTopics = [
    "How to manage projects efficiently",
    "Introduction to React Hooks",
    "Building RESTful APIs with Node.js",
    "Top UI design principles",
    "Handling errors in Axios"
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Project Details</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Project Details */}
        <div className="lg:w-2/3 bg-white p-8 rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{project?.title}</h2>
          <p className="text-lg text-gray-600 mb-6">{project?.description}</p>

          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Created: {new Date(project?.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Status: {project?.status || "Pending"}</p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-xl font-medium text-gray-700">Additional Information</h3>
              <p className="text-sm text-gray-500 mt-2">Project ID: {project?._id}</p>
            </div>
          </div>
        </div>

        {/* Recommended Topics */}
        <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recommended Topics</h2>
          <ul className="space-y-2">
            {recommendedTopics.map((topic, index) => (
              <li key={index} className="text-sm text-blue-600 hover:underline cursor-pointer">
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OneProject;
