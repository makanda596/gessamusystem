import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';  // Import useParams hook

const Specific = () => {
    const { id } = useParams();  // Use useParams to get the 'id' from the URL

    const [task, setTask] = useState(null);
    const [error, setError] = useState('');

    const showSpecific = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/task/onetask/${id}`);  // Fetch task data using 'id'
            setTask(response.data);
        } catch (error) {
            setError('Failed to load task. Please try again later.');
        }
    };

    useEffect(() => {
        showSpecific();
    }, []);  // Trigger whenever 'id' changes

    if (error) {
        return <div>{error}</div>;
    }

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Task Details</h1>
            <p><strong>Task Name:</strong> {task.task}</p>  {/* Assuming your task has a 'name' */}
            <p><strong>Description:</strong> {task.description}</p>  {/* Assuming your task has a 'description' */}
            {/* Add more task fields as necessary */}
        </div>
    );
};

export default Specific;
