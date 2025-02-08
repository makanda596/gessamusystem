import React, { useState } from 'react'
import { useAuthStore } from '../../store/auth'

const AdminDashboard = () => {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [date, setDate] = useState()
    const [doc, setDoc] = useState()
    const [level, setLevel] = useState()

    const { postTask } = useAuthStore()
    const postHandle = async () => {
        try {
            await postTask(title, description, date, level)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <>

            <div>AdminDashboard

                <form >
                    <input type="text" value={title} placeholder="Task Title" onChange={(e) => setTitle(e.target.value)} />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <input type="file" />
                    <input type="number" value={level} onChange={(e) => setLevel(e.target.value)} />
                    <textarea placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} />

                    <button onClick={postHandle}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default AdminDashboard