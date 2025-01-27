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
        return (
            <div className="flex justify-center items-center h-screen text-xl text-gray-500">
                Loading...
            </div>
        ); // Show a loading message
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-xl text-red-500">
                {error}
            </div>
        ); // Show an error message
    }

    // Render the project details
    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Project Details</h1>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{project?.title}</h2>
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
        </div>
    );
};

export default OneProject;
