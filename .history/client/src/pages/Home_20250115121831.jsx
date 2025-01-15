import React from 'react'
import { useAuthStore } from '../store/auth'
function Home() {
    const { logout, error } = useAuthStore()

    const handlesubmit = async (e) => {
        e.prevent.default();
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            home
            <button onSubmit={handlesubmit}> logout</button>
        </div>
    )
}

export default Home
