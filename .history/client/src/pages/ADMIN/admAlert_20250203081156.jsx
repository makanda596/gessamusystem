import React, { useState } from 'react'
import axios from 'axios'
const AdmAlert = () => {
    const [message ,setMessage] =  useState();
    const [userId ,setUserId] = useState();
    const [error, setError] = useState();
const [mess,setMess] = useState();
    const postAlert = async(message,userId)=>{
        try {
            const response = await axios.post('http://localhost:5000/alert/makeAlert',{message,userId})
            setMess("Alert send to the user",response.data)
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <>
          <div>admAlert</div>
          {error ? <p>{error}</p> : <p>{mess}</p>}
          <>
          <input type="text" placeholder="enter your alert" value={message} onChange={(e) =>setMessage(e.target.value)} />
              <input type="text" placeholder="enter the user id" value={userId} onChange={(e) => setUserId(e.target.value)} />
          <button onClic={postAlert}>SEND</button>
          </>

    </>
  )
}

export default AdmAlert