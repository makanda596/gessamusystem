import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetProjects = () => {
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost:5000/projects/getAllprojects");
            setProjects(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                        <p className="text-gray-600 mt-2">{project.Description}</p>
                        <p className="text-sm text-gray-500 mt-1">Reference: {project.reference}</p>
                        <p className="text-sm text-gray-500">Year: {project.year}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetProjects;