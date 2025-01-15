import React from 'react'
import { useAuthStore } from '../store/auth'
function Home() {
    const { logout, error } = useAuthStore()

    const handlesubmit = async (e) => {
        try {
            await logout()
            window.location.href = "/";
            console.log("logout")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <p>home</p>
            <button onClick={handlesubmit}> logout</button>

        </div>
    )
}

export default Home
