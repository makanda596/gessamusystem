import React from 'react'
import { useAuthStore } from '../store/auth'

const Projects = () => {
    const { projects } = useAuthStore()
    return (
        <div>Projects{projects}</div>
    )
}

export default Projects