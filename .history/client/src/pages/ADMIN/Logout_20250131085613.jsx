import React from 'react'
import axios from 'axios'
const Logout = () => {

    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:5000/admin/adminLogout")
            console.log(response)
            window.location.href = '/'
        } catch (error) {

        }
    }
    return (
        <div>Logout</div>
    )
}

export default Logout