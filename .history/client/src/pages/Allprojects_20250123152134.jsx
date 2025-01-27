import React, { useState } from 'react'
import axios from 'axios'
const Allprojects = () => {
    //getting the projects 
    const [projects, setProjects] = useState([])

    const onSubmit = async () => {
        try {
            const response = await axios.get("http://localhost:5000/projects/getprojects")
            const allprojects = response.data
            setProjects(allprojects)
        } catch (error) {

        }
    }
    return (
        <div>Allprojects
            <p>enter year</p>
            <input type="number" placeholder="enter your year" />
            <button type="submit" onClick={onSubmit}>CLICK</button>

        </div>
    )
}

export default Allprojects