import React, { useState, useEffect } from 'react';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('dueDate'); // Sorting by dueDate, title, or completed
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    useEffect(() => {
        setLoading(true);
        setError('');
        // Simulating API call to fetch tasks
        setTimeout(() => {
            const fetchedTasks = [
                { id: 1, title: 'Task 1', description: 'Description for task 1', dueDate: '2025-01-30', completed: false },
                { id: 2, title: 'Task 2', description: 'Description for task 2', dueDate: '2025-02-10', completed: true },
                { id: 3, title: 'Task 3', description: 'Description for task 3', dueDate: '2025-03-15', completed: false },
                { id: 4, title: 'Task 4', description: 'Description for task 4', dueDate: '2025-01-25', completed: true },
                { id: 5, title: 'Task 5', description: 'Description for task 5', dueDate: '2025-04-18', completed: false },
                { id: 6, title: 'Task 6', description: 'Description for task 6', dueDate: '2025-02-28', completed: true },
                { id: 7, title: 'Task 7', description: 'Description for task 7', dueDate: '2025-03-01', completed: false },
            ];
            setTasks(fetchedTasks);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    useEffect(() => {
        let filtered = tasks;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (statusFilter !== 'All') {
            const isCompleted = statusFilter === 'Completed';
            filtered = filtered.filter(task => task.completed === isCompleted);
        }

        // Filter by date range
        if (dateRange.start && dateRange.end) {
            filtered = filtered.filter(task =>
                new Date(task.dueDate) >= new Date(dateRange.start) &&
                new Date(task.dueDate) <= new Date(dateRange.end)
            );
        }

        // Sort tasks based on selected order
        if (sortOrder === 'dueDate') {
            filtered = filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else if (sortOrder === 'title') {
            filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === 'completed') {
            filtered = filtered.sort((a, b) => a.completed - b.completed);
        }

        setFilteredTasks(filtered);
    }, [searchTerm, statusFilter, dateRange, sortOrder, tasks]);

    const handleAddTask = () => {
        if (!newTask.title || !newTask.description || !newTask.dueDate) {
            setError('Please fill in all the fields.');
            return;
        }
        const newTaskObj = { ...newTask, id: tasks.length + 1, completed: false };
        setTasks([...tasks, newTaskObj]);
        setNewTask({ title: '', description: '', dueDate: '' });
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleToggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    return (
        <div className="task-page max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Task Management</h1>

            {loading && <div>Loading tasks...</div>}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Filters */}
            <div className="filters mb-6 flex justify-between">
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-2 border border-gray-300 rounded"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                </select>
                <input
                    type="date"
                    className="p-2 border border-gray-300 rounded"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
                <input
                    type="date"
                    className="p-2 border border-gray-300 rounded"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
                <select
                    className="p-2 border border-gray-300 rounded"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="dueDate">Due Date</option>
                    <option value="title">Title</option>
                    <option value="completed">Completion Status</option>
                </select>
            </div>

            {/* Add Task Form */}
            <div className="mb-6">
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <textarea
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                    placeholder="Task description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <input
                    type="date"
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded-md"
                    onClick={handleAddTask}
                >
                    Add Task
                </button>
            </div>

            {/* Task List */}
            <div className="task-list">
                {currentTasks.length === 0 ? (
                    <p>No tasks found</p>
                ) : (
                    <ul>
                        {currentTasks.map(task => (
                            <li key={task.id} className="task-item mb-4 p-4 border border-gray-200 rounded-md shadow-md hover:shadow-lg">
                                <h2 className="text-xl font-semibold">{task.title}</h2>
                                <p>{task.description}</p>
                                <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                                <div className="task-actions mt-2 flex justify-between items-center">
                                    <button
                                        onClick={() => handleToggleComplete(task.id)}
                                        className={`px-4 py-2 rounded-md ${task.completed ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                    >
                                        {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination mt-6 flex justify-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-gray-300 text-gray-700 p-2 rounded-md mx-2"
                    >
                        Prev
                    </button>
                    <span className="text-gray-700">
                        {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-gray-300 text-gray-700 p-2 rounded-md mx-2"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskPage;
