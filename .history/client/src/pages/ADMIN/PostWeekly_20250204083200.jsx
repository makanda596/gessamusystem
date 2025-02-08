import React, { useState } from 'react'
import axios from 'axios'
const PostWeekly = () => {
    const [title, setTitle] = useState()
    const [trainer ,setTrainer]= useState()
    const [description, setDescription] = useState()
    const [reference, setReference] = useState()
    const [date,setDate] = useState()
    const [file,setFile]= useState()
    const [message,setMessage] = useState()
    const [error, setError] = useState()

    const hadleSubmit = async () =>{
        // e.preventDefault()
        try {
            const reponse = await axios.post("http://localhost:5000/projects//weekly-projects",
                { title, trainer, description, reference, date ,file},            )
                setMessage("weekly project submitted succesfully")

        } catch (error) {
            setError(error.response?.data?.message || 'Failed to send alert.');
           
        }
    }
  return (
    <>
    <div>PostWeekly ksod
        {error ? <p>{error}</p> : <p>{message}</p>}
        <form>
            <input type="text" value={title} onChange={(e) =>setTitle(e.target.value)}  placeholder='title of the project'/>
            <input type="text" value={title} onChange={(e) =>setTitle(e.target.value)}  placeholder='title of the project'/>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='description of the project' />
              <input type="text" value={reference} onChange={(e) => setReference(e.target.value)} placeholder='reference of the project' />
              <input type="text" value={trainer} onChange={(e) => setTrainer(e.target.value)} placeholder='Trainer of the project' />
              <input type="file" value={file} onChange={(e) => setFile(e.target.value)}  />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}  />
              <button onClick={hadleSubmit} >POST</button>
        </form> 
    </div>
      </>
  )
}

export default PostWeekly