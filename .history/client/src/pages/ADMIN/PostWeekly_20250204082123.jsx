import React, { useState } from 'react'
import axios from 'axios'
const PostWeekly = () => {
    const [title, setTitle] = useState()
    const [trainer ,setTrainer]= useState()
    const [description, setDescription] = useState()
    const [reference, setReference] = useState()
    const [date,setDate] = useState()
    const [file,setFile]= useState()
  return (
    <div>PostWeekly ksod
        <form>
            <input type="text" value={title} onChange={(e) =>setTitle(e.target.value)}  placeholder='title of the project'/>
            <input type="text" value={title} onChange={(e) =>setTitle(e.target.value)}  placeholder='title of the project'/>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='description of the project' />
              <input type="text" value={reference} onChange={(e) => setReference(e.target.value)} placeholder='reference of the project' />
              <input type="file" value={file} onChange={(e) => setFile(e.target.value)}  />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}  />

        </form> 
    </div>
  )
}

export default PostWeekly