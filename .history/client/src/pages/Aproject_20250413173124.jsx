import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const Aproject = () => {
    const {project, setProject}=useState()
const {id}=useParams()
    const fetchProject = async()=>{
        try {
            const response = await axios.get(`http://localhost:5000/userProjects/takeProject/${id}`)
            setProject(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchProject()
    },[])
  return (
    <div>Aproject</div>
  )
}

export default Aproject