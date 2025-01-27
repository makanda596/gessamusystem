import React from 'react'
import { useAuthStore } from '../store/auth'

const Navbar = () => {
    const { user } = useAuthStore()
    return (
        <>
            {user?.email && <p>Welcome, {user?.email}!</p>}

            <div>Navbar</div>
        </>
    )
}

export default Navbar