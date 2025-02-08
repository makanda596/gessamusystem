import React, { useEffect, useState } from 'react'
import axios from 'axios'

const GetWeekly = () => {
    const [projects,setProjects] =useState()
    const [error,setError] = useState()
    const [message,setMessage] = useState()

    const fetchProjects = async ()=>{
        try {
            const response = await axios.get("http://localhost:5000/projects/weekly-projects")
            console.log(response.data)
            setProjects(response.data)
        } catch (error) {
            setError(error.message)
        }
    }
    useEffect(() =>{
        fetchProjects()
    },[])
  return (
    <>
    <div>GetWeekly</div>
    {error && <p>{error}</p>}
    {message && <p>{message}</p>}
    <div>
        {projects.length > 0 ?(
            projects.map((project,index)=>{
                return <div key={index}>
                    <p>{project.title}</p>
                    <p>{project.trainer}</p>
                    <p>{project.description}</p>
                    <p>{project.reference}</p>
                    <p>{project.title}</p>
                    <p>{project.doc}</p>
                </div>
            })
        ) : (<p>NO WEEKLY PROJECTS FOUND</p>)}
    </div>
      </>
  )
}

export default GetWeekly