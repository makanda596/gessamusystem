import React from 'react'
import { useAuthStore } from '../store/auth'
import Navbar from '../components/Navbar.jsx'
import Projects from '../components/Projects.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Footer from '../components/Footer.jsx'

function Home() {
    const { logout } = useAuthStore()

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
            <Navbar userId="679c7322a2ff5f84894bc948"/>
            <Dashboard />
            <p>home</p>
            <Projects />
            <Footer />
            <button onClick={handlesubmit}> logout</button>

        </div>
    )
}

export default Home
