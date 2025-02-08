import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetProjects = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);  // To manage the modal visibility
    const [projectToDelete, setProjectToDelete] = useState(null); // Store the project to delete

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
            await axios.delete(`http://localhost:5000/projects/deleteProject/${id}`);

            // Remove the deleted project from the state (frontend)
            setProjects(projects.filter(project => project._id !== id)); // Make sure to match the correct field (_id)
            setShowModal(false); // Close the modal after deletion
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    // Open confirmation modal
    const handleDeleteClick = (id) => {
        setShowModal(true);
        setProjectToDelete(id);
    };

    // Close the confirmation modal
    const handleCloseModal = () => {
        setShowModal(false);
        setProjectToDelete(null);
    };

    // Cancel the delete action
    const handleCancelDelete = () => {
        setShowModal(false);
        setProjectToDelete(null);
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
                                onClick={() => handleDeleteClick(project._id)} // Open modal on click
                            >
                                Delete
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={() => console.log("Update project", project._id)} // Add update logic here
                            >
                                Update
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold text-gray-800">Are you sure you want to delete this project?</h3>
                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => deleteProject(projectToDelete)} // Delete the project
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                onClick={handleCancelDelete} // Close the modal without deleting
                            >
                                NO
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetProjects;
