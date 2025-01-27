import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Tasks = () => {
    const [task, setTask] = useState()

    const showTask = async (req, res) => {
        const response = await axios.get("")
        setTask(response.data)
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