import React, { useState } from 'react'
import { useAuthStore } from '../../store/auth'

const AdminDashboard = () => {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [date, setDate] = useState()
    const [doc, setDoc] = useState()

    const { postTask } = useAuthStore()
    return (
        <>

            <div>AdminDashboard
                <form >
                    <input type="text" placeholder="Task Title" value={(e) => setTitle(e.target.value)} />
                    <input type="date" value={(e) => setDate(e.target.value)} />
                    <input type="file" onChange={(e) => setDoc(e.target.files[0])} />
                    <textarea placeholder="Task Description" value={(e) => setDescription(e.target.value)} />

                    <button onClick={() => postTask()}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default AdminDashboard