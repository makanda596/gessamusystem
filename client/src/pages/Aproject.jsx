import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaBriefcase, FaRegClock, FaUser, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';

const Aproject = () => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const fetchProject = async () => {
        setLoading(true); 
        try {
            const response = await axios.get(`https://gessamusystem-back.onrender.com/userProjects/takeProject/${id}`);
            setProject(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching project:', error);
            setError('Failed to load project. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-600 font-medium">Loading Project Details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Error Loading Project</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link
                        to="/projects"
                        className="inline-flex items-center justify-center w-full py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                    <div className="text-gray-400 text-6xl mb-4"></div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Project Not Found</h2>
                    <p className="text-gray-600 mb-6">The requested project could not be found.</p>
                    <Link
                        to="/projects"
                        className="inline-flex items-center justify-center w-full py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        Browse Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <Link
                        to="/projects"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Projects
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="relative">
                        <div className="h-64 md:h-96 bg-gradient-to-r from-indigo-500 to-purple-600">
                            {project.image && (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover opacity-90"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>

                       
                    </div>

                    <div className="px-2 py-2 md:px-10 md:py-12">
                        <div className="flex items-center bg-gray-50 rounded-xl p-3 mb-4">
                            {project.userId?.avatar && (
                                <img
                                    src={project.userId.avatar}
                                    alt={`${project.userId.firstName} ${project.userId.lastName}`}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-green shadow-sm mr-5"
                                />
                            )}
                            <div>
                                <div className="flex items-center mb-1">
                                    <FaUser className="text-indigo-600 mr-2" />
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {project.userId?.firstName} {project.userId?.lastName}
                                    </h3>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaEnvelope className="text-gray-400 mr-2" />
                                    <a
                                        href={`mailto:${project.userId?.email}`}
                                        className="text-sm text-blue-500 hover:underline"
                                    >
                                        {project.userId?.email}
                                    </a>
                                </div>

                            </div>
                        </div>

                        <div className="space-y-2">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-2 underline">Project Title</h2>
                                <div className="prose max-w-none text-gray-600 leading-relaxed">
                                  title:  {project.title}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-2 underline">Project Description</h2>
                                <div className="prose max-w-none text-gray-600 leading-relaxed">
                                    {project.description}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <FaBriefcase className="mr-2 text-indigo-600" />
                                    Required Resources
                                </h2>
                                <div className="bg-indigo-50 rounded-xl p-3">
                                    <p className="text-gray-700 leading-relaxed">
                                        {project.resources}
                                    </p>
                                </div>
                            </div>

                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aproject;