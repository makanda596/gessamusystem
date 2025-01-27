import React from 'react'
import { useAuthStore } from '../store/auth'
import Navbar from '../components/Navbar.jsx'
import Projects from '../components/Projects.jsx'
import Allprojects from '../pages/Allprojects.jsx'
function Home() {
    const { logout, error } = useAuthStore()

    const handlesubmit = async (e) => {
        try {
            await logout()
            window.location.href = "/";
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>

            <Navbar />
            <p>home</p>
            <Projects />
            <button onClick={handlesubmit}> logout</button>
            <Allprojects />

        </div>
    )
}

export default Home
