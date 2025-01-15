import React from 'react'
import axios from 'axios'
import { useAuthStore } from '../store/auth'
function Home() {
    const handlesubmit = async (e) => {
        const { logout, error } = useAuthStore()
        e.prevent.default().
            try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            home
            <button onSubmit="handlesubmit"> logout</button>
        </div>
    )
}

export default Home
