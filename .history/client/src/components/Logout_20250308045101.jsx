import React from 'react'

const Logout = ({logout}) => {

    const handleLougout = async ()=>{
        try{
            await logout()
            window.location.href = "/"
        }catch(error){
        console.log(error)
        }
        
    }

  return (
    <button onClick={handleLougout}>Logouts</button>
  )
}

export default Logout