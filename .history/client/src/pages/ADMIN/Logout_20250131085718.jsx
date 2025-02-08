import React from 'react'
import axios from 'axios'
const Logout = () => {

    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:5000/admin/adminLogout")
            console.log(response)
            window.location.href = '/'
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Logout