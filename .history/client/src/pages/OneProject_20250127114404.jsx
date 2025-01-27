import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the :id
import axios from "axios";

const OneProject = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [project, setProject] = useState(null); // Store the project data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(""); // Error state

    // Fetch the specific project
    const fetchProject = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/projects/oneproject/${id}`);
            setProject(response.data); // Set the project data
        } catch (err) {
            setError("Failed to load project. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Fetch project details on component mount
    useEffect(() => {
        fetchProject();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading message
    }

    if (error) {
        return <div className="text-red-500">{error}</div>; // Show an error message
    }

    // Render the project details
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Project Details</h1>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-2">{project?.name}</h2>
                <p className="text-gray-700 mb-4">{project?.description}</p>
                <img
                    src={project?.doc}
                    alt={project?.name || "Project"}
                    className="w-full h-auto rounded-md"
                    onError={(e) => (e.target.src = "/images/default.jpg")} // Fallback image
                />
                <p className="text-sm text-gray-500 mt-4">
                    Created: {new Date(project?.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                    Status: {project?.status || "Pending"}
                </p>
            </div>
        </div>
    );
};

export default OneProject;
