import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Projects = () => {
    const [complains, setComplains] = useState([])
    //fetch tasks 
    const fetchTasks = async () => {
        try {
            const respond = axios.get("http://localhost:5000/task/takeTask")
            const sortedTasks = respond.data
            setComplains(sortedTasks)
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchTasks()
    }, [])
    return (
        <div>
            <h1>Complains</h1>
            <ul>
                {complains.map((complain, index) => (
                    <li key={index}>
                        <p>{complain.task}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Projects