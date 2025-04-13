import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { FaEllipsisV, FaSearch, FaShare, FaRegClock, FaRegCheckCircle } from 'react-icons/fa';
import { useAuthStore } from '../store/auth';
import SubmitTask from '../components/SubmitTask';

const Tasks = () => {
    // ... existing state declarations remain the same ...

    const showTask = async () => {
        try {
            const response = await axios.get(`${import.meta.env.BACKEND_URL}/task/takeTask`);
            setTasks(response.data);
        } catch (error) {
            setError('Failed to load tasks. Please try again later.');
            showNotification('Failed to load tasks!');
        } finally {
            setLoading(false);
        }
    };

    // ... rest of the main component logic remains the same ...

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <FaRegCheckCircle className="text-blue-600" />
                            Available Tasks
                        </h1>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <button 
                                onClick={() => setIsPopup(true)}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <span>+</span> Submit Task
                            </button>
                            <div className="relative w-full md:w-64">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <SubmitTask isPopup={isPopup} setIsPopup={setIsPopup} />

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center mt-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center mb-4">
                            {error}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && filteredTasks.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                            <p className="text-gray-500 text-lg">No tasks found matching your search</p>
                        </div>
                    )}

                    {/* Task Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedTasks.map((task) => (
                            <TaskCard key={task._id} task={task} showNotification={showNotification} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 gap-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-2 ${
                                        currentPage === index + 1
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                                    } rounded-md`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Notification */}
            {notification && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg">
                    {notification}
                </div>
            )}
        </>
    );
};

const TaskCard = ({ task, showNotification }) => {
    // ... existing TaskCard state and logic remains the same ...

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            {/* Task card content remains the same */}
        </div>
    );
};

export default Tasks;