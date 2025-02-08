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
        <>
            <div>GetProjects</div>
            <div>
                {projects.map((project, index) => {
                    return <div key={index}>
                        <p>{project.title}</p>
                        <p>{project.Description}</p>
                        <p>{project.reference}</p>
                        <p>{project.year}</p>
                    </div>
                })}
            </div>
        </>
    )
}

export default GetProjects