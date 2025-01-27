import React from 'react'
import { useAuthStore } from '../../store/auth'

const AdminDashboard = () => {
    const { user } = useAuthStore()
    return (
        <>

            <div>AdminDashboard
                <p>{user.email}</p>
            </div>
        </>
    )
}

export default AdminDashboard