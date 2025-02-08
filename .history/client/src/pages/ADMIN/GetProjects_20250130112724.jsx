import React, { useState, useEffect } from 'react'
import axios from 'axios'
const GetProjects = () => {
    const [projects, setProjects] = useState([])

    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost:5000/projects/getAllprojects")
            setProjects(response.data)
        }
        catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        fetchProjects()
    }, [])
    return (
        <div>GetProjects</div>
    )
}

export default GetProjects