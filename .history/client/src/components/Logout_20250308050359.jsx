import React from 'react'
import { useAuthStore } from '../store/auth'

const Logout = () => {
    const { logout } = useAuthStore()

    const handleLougout = async ()=>{
        try{
            await logout()
            window.location.href = "/"
        }catch(error){
        console.log(error)
        }
        
    }

  return (
    <button onClick={handleLougout} logout={logout} className='text-black'>Logout</button>
  )
}

export default Logout