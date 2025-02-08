import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from '../assets/logo.PNG'

const OneProject = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [weeklyProjects, setWeeklyProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showCopyMessage, setShowCopyMessage] = useState(false); // State for pop-up

    const fetchProject = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/projects/oneproject/${id}`);
            setProject(response.data);
        } catch (err) {
            setError("Failed to load project. Please try again.");
        }
    };

    const fetchWeeklyProjects = async () => {
        try {
            const response = await axios.get("http://localhost:5000/projects/getweekly-projects");
            const filteredProjects = response.data.filter((proj) => proj._id !== id).slice(0, 6);
            setWeeklyProjects(filteredProjects);
        } catch (error) {
            setError("Failed to fetch weekly projects.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchProject();
            await fetchWeeklyProjects();
            setLoading(false);
        };
        fetchData();
    }, [id]);

    const handleCopyLink = (link) => {
        navigator.clipboard.writeText(link);
        setShowCopyMessage(true);
        setTimeout(() => setShowCopyMessage(false), 3000); // Hide after 3 seconds
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-xl text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Project Details</h1>

            {/* Pop-up Notification */}
            {showCopyMessage && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-all duration-300">
                    Link copied to clipboard!
                </div>
            )}

            <div className="flex flex-col lg:flex-row lg:space-x-8">
                {/* Project Details */}
                <div className="lg:w-2/3 bg-blue-50 p-8 rounded-lg shadow-lg border border-blue-300">
                    <h2 className="text-xl font-semibold text-blue-800 mb-4">{project?.title}</h2>
                    <p className="text-xl text-gray-700 mb-6" style={{ lineHeight: "2.2" }}>
                        {project?.description}
                    </p>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-600">Created: {new Date(project?.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600">Status: {project?.status || "Pending"}</p>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-gray-800 font-semibold">Download Project Document:</p>
                            <a
                                href={project.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:underline cursor-pointer"
                                download
                            >
                                Click here to download the project document (PDF)
                            </a>
                        </div>

                        <div className="mt-4">
                            <p className="text-md text-black font-bold">Link:</p>
                            <div className="flex items-center space-x-2">
                                <a href={project.reference} target="_blank" rel="noreferrer" className="text-black-600 font-bold underline hover:text-green-600">
                                    {project.reference}
                                </a>
                                <button
                                    onClick={() => handleCopyLink(project.reference)}
                                    className="ml-2 px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded border"
                                >
                                    Copy Link
                                </button>
                            </div>
                        </div>

                        <div className="border-t border-blue-200 pt-4">
                            <h3 className="text-xl font-medium text-blue-800">Additional Information</h3>
                            <p className="text-sm text-gray-600 mt-2">Project ID: {project?._id}</p>
                        </div>
                    </div>
                </div>

                {/* Recommended Projects */}
                <div className="lg:w-1/3 bg-white p-2 rounded-lg shadow-md border border-gray-300 h-full fixed right-2 top-2">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recommended Projects</h2>
                    {weeklyProjects.length > 0 ? (
                        <ul className="space-y-4">
                            {weeklyProjects
                                .slice() // Create a shallow copy to avoid modifying the original array
                                .reverse() // Reverse the order to get the latest projects first
                                .slice(0, 6) // Take the first 6 items after reversing
                                .map((proj) => (
                                    <li key={proj._id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100">
                                        <img
                                            src={logo}
                                            alt={proj.title}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <a href={`/project/${proj._id}`} className="text-md font-semibold text-blue-600 hover:underline">
                                                {proj.title}
                                            </a>
                                            <p className="text-sm text-gray-600">
                                                {proj.description.length > 50 ? proj.description.slice(0, 50) + "..." : proj.description}
                                            </p>
                                            <p>{proj.date}</p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                navigator.share
                                                    ? navigator.share({ title: proj.title, url: `${window.location.origin}/project/${proj._id}` })
                                                    : navigator.clipboard.writeText(`${window.location.origin}/project/${proj._id}`)
                                            }
                                            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
                                        >
                                            Share
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">No recommended projects available.</p>
                    )}
                </div>


            </div>
        </div>
    );
};

export default OneProject;
