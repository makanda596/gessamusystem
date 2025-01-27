import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
const Tasks = () => {
    const [task, setTask] = useState()

    const showTask = async (req, res) => {
        try {
            const response = await axios.get("")
            setTask(response.data)
        } catch (error) {
            alert(error.message)
        }

    }
    useEffect(() => {
        showTask()
    }, [])
    return (
        <>
            <Navbar />
            <div>Tasks</div>
            <div >
                {task}
            </div>
        </>
    )
}

export default Tasks