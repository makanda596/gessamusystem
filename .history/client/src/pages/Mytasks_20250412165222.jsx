import React, { useEffect } from 'react'
import { useAuthStore } from '../store/auth'
import { FiRefreshCw, FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi'

const Mytasks = () => {
    const { getSubmittedTask, tasks, isLoading, error } = useAuthStore()

    useEffect(() => {
        getSubmittedTask()
    }, [getSubmittedTask])

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return { color: 'bg-green-100 text-green-800', icon: <FiCheckCircle className="mr-2" /> }
            case 'pending':
                return { color: 'bg-yellow-100 text-yellow-800', icon: <FiClock className="mr-2" /> }
            case 'rejected':
                return { color: 'bg-red-100 text-red-800', icon: <FiAlertCircle className="mr-2" /> }
            default:
                return { color: 'bg-gray-100 text-gray-800', icon: <FiClock className="mr-2" /> }
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Submitted Tasks</h1>
                <button
                    onClick={getSubmittedTask}
                    className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                    <FiRefreshCw className="mr-2" /> Refresh
                </button>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
                    <FiAlertCircle className="mr-2 text-xl" />
                    {error}
                </div>
            )}

          { tasks.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-500">No tasks submitted yet</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => {
                        const statusBadge = getStatusBadge(task.status)
                        return (
                            <div
                                key={task._id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
                            >
                                <div className="mb-4 relative">
                                    <img
                                        src={task.image}
                                        alt="Task submission"
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <span
                                        className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm flex items-center ${statusBadge.color}`}
                                    >
                                        {statusBadge.icon}
                                        {task.status || 'Pending'}
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {task.title || 'Untitled Task'}
                                </h3>

                                <div className="flex items-center justify-between mt-4">
                                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                                        View Details
                                    </button>
                                    <span className="text-sm text-gray-500">
                                        {new Date(task.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Mytasks