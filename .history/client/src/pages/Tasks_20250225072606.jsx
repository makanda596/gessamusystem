import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 6;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('https://gessamubackend.onrender.com/task/takeTask');
                setTasks(response.data);
            } catch (error) {
                setError('Failed to load tasks. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const filteredTasks = tasks.filter(task =>
        task.task?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const startIndex = (currentPage - 1) * tasksPerPage;
    const displayedTasks = filteredTasks.slice(startIndex, startIndex + tasksPerPage);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-4">
                <h1 className="text-xl font-bold text-center text-blue-600 mb-4">Available Tasks</h1>
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {loading && <p className="text-center">Loading tasks...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {filteredTasks.length === 0 && !loading && !error && <p className="text-center">No tasks found.</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayedTasks.map((task) => (
                        <TaskCard key={task._id} task={task} />
                    ))}
                </div>

                <div className="flex justify-center mt-6 gap-4">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-4 py-2 bg-blue-500 text-white rounded">Back</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
                </div>
            </div>
        </>
    );
};

const TaskCard = ({ task }) => {
    const [showShareOptions, setShowShareOptions] = useState(false);

    const shareTask = (platform) => {
        const taskUrl = `${window.location.origin}/task/${task._id}`;
        switch (platform) {
            case 'copy':
                navigator.clipboard.writeText(taskUrl);
                alert('Task link copied to clipboard!');
                break;
            case 'email':
                window.location.href = `mailto:?subject=Check out this task&body=${taskUrl}`;
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(taskUrl)}`, '_blank');
                break;
            default:
                break;
        }
        setShowShareOptions(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md relative">
            <h2 className="text-lg font-bold text-blue-700">{task.task}</h2>
            <p className="text-gray-700 mb-4">{task.description}</p>
            <div className="flex justify-end relative">
                <button onClick={() => setShowShareOptions(!showShareOptions)} className="p-2 bg-gray-300 rounded-full">⋮</button>
                {showShareOptions && (
                    <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40">
                        <button onClick={() => shareTask('copy')} className="block w-full px-4 py-2 hover:bg-gray-200">Copy Link</button>
                        <button onClick={() => shareTask('email')} className="block w-full px-4 py-2 hover:bg-gray-200">Share via Email</button>
                        <button onClick={() => shareTask('whatsapp')} className="block w-full px-4 py-2 hover:bg-gray-200">Share on WhatsApp</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tasks;
