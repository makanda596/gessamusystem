import React from 'react'
import { useAuthStore } from '../store/auth'
import { useEffect } from 'react'
import { FaRegClock, FaBriefcase, FaTrash } from 'react-icons/fa'
import axios from 'axios'
import { useState } from 'react'
import SubmitProject from '../components/SubmitProject'

const MyProjects = () => {
    const { alluserProjects, getUserProjetcs } = useAuthStore()
    const { isPopup, setIsPopup }=useState(false)

    useEffect(() => {
        getUserProjetcs()
    }, [])

    const deleteFunction = async (projectId) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return

        try {
            const token = localStorage.getItem("token")
            await axios.delete(
                `http://localhost:5000/userProjects/deleteUserProject/${projectId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            // Refresh projects list after deletion
            await getUserProjetcs()
        } catch (error) {
            console.error("Delete error:", error)
            alert('Failed to delete project. Please try again.')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 border-b border-gray-200 pb-4">
                    <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
                    <p className="text-gray-600 mt-2">Manage and review your submitted projects</p>
                </div>

                {alluserProjects.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="max-w-md mx-auto">
                            <div className="text-gray-400 text-5xl mb-4">📁</div>
                            <h2 className="text-xl font-medium text-gray-900 mb-2">
                                No Projects Found
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Get started by submitting your first project!
                            </p>
                            <button
                                onClick={() => setIsPopup(true)}
                                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Create New Project
                            </button>
                            <SubmitProject isPopup={isPopup} setIsPopup={setIsPopup} />

                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {alluserProjects.map((project) => (
                            <div
                                key={project._id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                            >
                                {/* Project Image */}
                                {project.image && (
                                    <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* Project Title */}
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {project.title}
                                    </h3>

                                    {/* Project Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Project Resources */}
                                    <div className="mb-4">
                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                            <FaBriefcase className="mr-2 text-gray-500" />
                                            <span className="font-medium">Resources:</span>
                                        </div>
                                        <div className="text-sm text-gray-600 line-clamp-2">
                                            {project.resources}
                                        </div>
                                    </div>

                                    {/* Project Metadata */}
                                    <div className="space-y-2 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <FaRegClock className="mr-2" />
                                            <span>
                                                Submitted: {new Date(project.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Delete Button */}
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end">
                                        <button
                                            onClick={() => deleteFunction(project._id)}
                                            className="text-red-600 hover:text-red-800 flex items-center text-sm"
                                        >
                                            <FaTrash className="mr-2" />
                                            Delete Project
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
        </div>
    )
}

export default MyProjects