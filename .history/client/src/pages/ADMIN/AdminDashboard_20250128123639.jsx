import React, { useState } from 'react'
import { useAuthStore } from '../../store/auth'

const AdminDashboard = () => {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [date, setDate] = useState()
    const [level, setLevel] = useState()
    const [reference, setReference] = useState()
    const [doc, setDoc] = useState()
    const [year, setYear] = useState()

    const { postTask } = useAuthStore()
    const postHandle = async () => {
        try {
            await postTask(title, description, date, level)
        } catch (error) {
            console.log(error.message)
        }
    }
    const postProjectHandle = async () => {
        try {
            await postProjectHandle(title, description, year, reference)

        }
        catch (error) {
            console.log(error.message)

        }
    }
    return (
        <>

            <div>AdminDashboard

                {/* for posting a task to the students  */}
                {/* <form >
                    <input type="text" value={title} placeholder="Task Title" onChange={(e) => setTitle(e.target.value)} />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <input type="number" value={level} onChange={(e) => setLevel(e.target.value)} />
                    <textarea placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button onClick={postHandle}>Submit</button>
                </form> */}

                {/* for posting a project to the students  */}

                <h3>MAKING OF A POSTING OF PROJECT</h3>
                <form>
                    <input type="text" value={title} placeholder="Task Title" onChange={(e) => setTitle(e.target.value)} />
                    <input type="date" value={year} onChange={(e) => setYear(e.target.value)} />
                    <input type="text" value={reference} onChange={(e) => setReference(e.target.value)} />
                    <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />

                    <textarea placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button onClick={postProjectHandle}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default AdminDashboard