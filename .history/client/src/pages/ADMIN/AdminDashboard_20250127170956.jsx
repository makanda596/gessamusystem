import React from 'react'
import { useAuthStore } from '../../store/auth'

const AdminDashboard = () => {
    const { user } = useAuthStore()
    return (
        <>

            <div>AdminDashboard
            </div>
        </>
    )
}

export default AdminDashboard