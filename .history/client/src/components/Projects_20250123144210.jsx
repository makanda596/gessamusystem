import React from 'react'
import { useAuthStore } from '../store/auth'

const Projects = () => {
    const { tasks } = useAuthStore()
    return (
        <div>Projects{tasks}</div>
    )
}

export default Projects