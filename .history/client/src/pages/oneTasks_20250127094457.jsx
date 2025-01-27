import React, { useEffect, useState } from 'react'
import axios from 'axios'
const oneTasks = () => {

    const [tasks, setTasks] = useState([])
    const [error, setError] = useState('');

    const showSpecific = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/task/onetask/:id`)
            setTasks(response.data)
        } catch (error) {
            setError('Failed to load tasks. Please try again later.');
        }
    }
    useEffect(() => {
        showSpecific()
    }, [])
    return (
        <div>oneTasks</div>
    )
}

export default oneTasks