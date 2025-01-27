import React from 'react'
import { useAuthStore } from '../store/auth'
import Navbar from '../components/Navbar.jsx'
import Projects from '../components/Projects.jsx'
import Allprojects from '../pages/Allprojects.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import { useAuthStore } from "../store/auth";

function Home() {
    const { logout } = useAuthStore()

    const handlesubmit = async (e) => {
        try {
            await logout()
            window.location.href = "/";
        } catch (error) {
            console.log(error)
        }
        const { user } = useAuthStore();

    }
    return (
        <div>
            <p>{user.email}</p>
            <Navbar />
            <Dashboard />
            <p>home</p>
            <Projects />
            <button onClick={handlesubmit}> logout</button>
            <Allprojects />

        </div>
    )
}

export default Home
