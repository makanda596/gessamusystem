import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Student = () => {
    const [students, setStudents] = useState([])
    const [error, setError] = useState('')

    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:5000/auth/getStudents")
            setStudents(response.data)
        } catch (error) {
            setError(error.message)
        }
    }
    useEffect(() => {
        fetchStudents()
    }, [])
    return (
        <>
            <div>Student</div>
            {error && <div>{error}</div>}
            <ul>
                {students.map(student => (
                    <lu key={student._id} >
                        <li >{student.firstName}</li>
                        <li> {student.lastName}</li>

                    </lu>
                ))}
            </ul>
        </>
    )
}

export default Student