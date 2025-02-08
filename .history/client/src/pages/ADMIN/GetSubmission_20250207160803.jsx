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
        setError("no submitted tasks found ")
        console.log("jd")
    }
    
  }
    useEffect(() => {
        fetchSubmissions()
    }, [])
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">Submissions</h1>
                {error && <p className="text-red-600">{error}</p>}
               
            </div>
           {submissions ? (
            submissions.map((submission) => (
                <div key={submission._id} className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">{submission.title}</h2>
                    <p>Description: {submission.description}</p>
                    <p>Submitted by: {submission.submittedBy}</p>
                </div>
            ))
            ) : (
                <p>No Submissions found</p>
            )}
           )}
        </div>
    );
};

export default GetSubmission;
