import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetWeekly = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('https://gessamusystem.onrender.com/projects/getweekly-projects');
            if (response.data.length > 0) {
                setProjects(response.data);
            } else {
                setError('No weekly projects found.');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch projects.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="min-h-screen w-full  p-8">
            <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">Weekly Projects</h2>

            {loading && (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
            )}

            {error && <p className="text-center text-red-500 font-medium">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden"
                    >
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                            <p className="text-gray-600"><strong>Trainer:</strong> {project.trainer}</p>
                        <p className="text-gray-600 mt-2">
                                <strong>Description:</strong> {project.description.length > 100
                                    ? `${project.description.slice(0, 100)}...`
                                    : project.description}
                            </p>

                            <p className="text-gray-600 mt-2"><strong>Reference:</strong> {project.reference || 'N/A'}</p>
                            <p className="text-gray-600 mt-2">
                                <strong>Date:</strong> {new Date(project.date).toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                            {project.doc && (
                                <div className="mt-4">
                                    <a
                                        href={project.doc}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                                    >
                                        View Document
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetWeekly;
