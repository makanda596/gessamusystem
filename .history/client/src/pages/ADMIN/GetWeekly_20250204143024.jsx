import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetWeekly = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/projects/weekly-projects');
      if (response.data.length > 0) {
        setProjects(response.data);
      } else {
        setError('No weekly projects found.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Weekly Projects</h2>

      {loading && <p className="text-center text-blue-500">Loading projects...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p><span className="font-medium">Trainer:</span> {project.trainer}</p>
            <p className="mt-2"><span className="font-medium">Description:</span> {project.description}</p>
            <p className="mt-2"><span className="font-medium">Reference:</span> {project.reference || 'N/A'}</p>
            <p className="mt-2"><span className="font-medium">Date:</span> {new Date(project.date).toLocaleDateString()}</p>
            {project.doc && (
              <p className="mt-2">
                <span className="font-medium">Document:</span>{' '}
                <a href={project.doc} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  View File
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetWeekly;
