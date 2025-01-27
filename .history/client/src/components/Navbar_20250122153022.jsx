import React from 'react'
import { useAuthStore } from '../store/auth'

const Navbar = () => {
    const { user } = useAuthStore()
    return (
        <>
            <p>{user.firstName}</p>
            <div>Navbar</div>
        </>
    )
}

export default Navbar