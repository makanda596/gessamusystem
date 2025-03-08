import React from 'react'
import { useAuthStore } from '../store/auth'
import { FaSignOutAlt } from "react-icons/fa"; 

const Logout = () => {
    const { logout } = useAuthStore()

    const handleLogout = async ()=>{
        try{
            await logout()
            window.location.href = "/"
        }catch(error){
        console.log(error)
        }
        
    }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-0 py-0 text-gray-700 hover:bg-gray-100 w-full"
    >
      <FaSignOutAlt className="mr-0 text-red-500" /> {/* Add icon with spacing */}
      Logout
    </button>
  )
}

export default Logout