import React from 'react'
import { useAuthStore } from '../../store/auth'

const AdminDashboard = () => {
    const { admin } = useAuthStore()
    return (
        <>

            <div>AdminDashboard
                <p>{admin.email}</p>
            </div>
        </>
    )
}

export default AdminDashboard