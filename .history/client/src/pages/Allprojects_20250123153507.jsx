import React, { useState } from 'react';
import axios from 'axios';

const Allprojects = () => {
    const [projects, setProjects] = useState([]);
    const [year, setYear] = useState(''); // State to store year input
    const [error, setError] = useState('');

    const onSubmit = async () => {
        if (!year) {
            setError('Please enter a year.');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/projects/getprojects?year=${year}`);
            setProjects(response.data);
        } catch (error) {
            console.error(error); // Log the error for debugging
            setError('Failed to fetch projects. Please check the year and try again.');
        }
    };


    return (
        <div>
            <h1>All Projects</h1>
            <p>Enter year</p>
            <input
                type="number"
                placeholder="Enter your year"
                value={year}
                onChange={(e) => setYear(e.target.value)} // Update year state
            />
            <button type="submit" onClick={onSubmit}>CLICK</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <div key={index}>
                            <h2>{project.title}</h2>
                            <p>{project.description}</p>
                            <p>{project.doc}</p>
                            <p>Year: {project.year}</p>
                        </div>
                    ))
                ) : (
                    <p>No projects found.</p>
                )}
            </div>
        </div>
    );
};

export default Allprojects;
