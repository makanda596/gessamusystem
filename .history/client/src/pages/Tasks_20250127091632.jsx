import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
            <div>Tasks</div>
            <div >

            </div>
        </>
    )
}

export default Tasks