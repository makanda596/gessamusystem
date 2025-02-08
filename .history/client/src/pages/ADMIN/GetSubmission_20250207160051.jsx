import React, { useEffect, useState } from 'react';
import axios from 'axios'
const GetSubmission = () => {
    const [submissions,setSubmissions] = useState()
    const [error,setError] = useState()
   
  const   fetchSubmissions = async (req,res) =>{
    try{
      const response = await axios.get("http://localhost:5000/task/getSubmittedTask")
      setSubmissions(response.data)
    }catch(error){
        setError(error.message)
    }
    
  }
    useEffect(() => {
        fetchSubmissions()
    }, [])
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">Submissions</h1>
                {error && <p>{error}</p>}
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
                    Refresh
                </button>
            </div>
        </div>
    );
};

export default GetSubmission;
