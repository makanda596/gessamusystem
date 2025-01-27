import React, { useEffect, useState } from 'react'
import axios from 'axios'

const OneTask = ({ taskId }) => {  // Expecting taskId as a prop or from URL params

    const [tasks, setTasks] = useState(null);
    const [error, setError] = useState('');

    const showSpecific = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/task/onetask/${taskId}`);  // Use taskId dynamically
            setTasks(response.data);
        } catch (error) {
            setError('Failed to load task. Please try again later.');
        }
    }

    useEffect(() => {
        if (taskId) {
            showSpecific();
        }
    }, [taskId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!tasks) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Task Details</h1>
            <p>{tasks.name}</p> {/* Replace with your task fields */}
            <p>{tasks.description}</p>
        </div>
    )
}

export default OneTask;
