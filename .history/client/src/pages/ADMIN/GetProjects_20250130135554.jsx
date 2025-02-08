import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetProjects = () => {
    const [projects, setProjects] = useState([]);

    // Fetching all projects from the backend
    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost:5000/projects/getAllprojects");
            setProjects(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    // Deleting a project
    const deleteProject = async (id) => {
        try {
            // Sending DELETE request to backend
            await axios.delete(`http://localhost:5000/projects/delete/${id}`);

            // Remove the deleted project from the state (frontend)
            setProjects(projects.filter(project => project._id !== id)); // Make sure to match the correct field (_id)
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    // Update project placeholder
    const updateProject = (id) => {
        console.log("Update project", id);
        // Add logic for updating a project
    };

    // Using useEffect to fetch projects on initial load
    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="p-6 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.map((project) => (
                    <div
                        key={project._id} // Use _id as the key
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                        <p className="text-gray-600 mt-2">{project.description}</p> {/* Make sure to use correct field name */}
                        <p className="text-sm text-gray-500 mt-1">Reference: {project.reference}</p>
                        <p className="text-sm text-gray-500">Year: {project.year}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => deleteProject(project._id)} // Use _id for deletion
                            >
                                Delete
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={() => updateProject(project._id)} // Use _id for updating
                            >
                                Update
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetProjects;
