import React, { useState } from 'react'
import axios from 'axios'
const admAlert = () => {
    const [message ,setMessage] = useState()
    const [userId ,setUserId] = useState()

    const postAlert = async(message,userId)=>{
        try {
            const response = await axios.post('http://localhost:5000/alert/makeAlert')
        } catch (error) {
            
        }
    }
  return (
    <>
          <div>admAlert</div>
          <>
          <input type="text" placeholder="enter your alert" />
          <input type="text" placeholder="enter the user id" />
          <button onClic={postAlert}>SEND</button>
          </>

    </>
  )
}

export default admAlert