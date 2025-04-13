import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaBriefcase, FaRegClock, FaUser, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';

const Aproject = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchProject = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/userProjects/takeProject/${id}`);
      setProject(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project:', error);
      setError('Failed to load project. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <div className="text-red-500 text-5xl mb-4 text-center">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">Error</h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <Link 
            to="/projects" 
            className="block w-full py-3 px-4 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <div className="text-gray-400 text-5xl mb-4 text-center">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">Project Not Found</h2>
          <p className="text-gray-600 text-center mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/projects" 
            className="block w-full py-3 px-4 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link to="/projects" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors">
          <FaArrowLeft className="mr-2" /> Back to Projects
        </Link>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Project Header with Image */}
          <div className="relative">
            {project.image ? (
              <div className="h-64 md:h-80 w-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
            ) : (
              <div className="h-64 md:h-80 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            )}
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
              <div className="mt-2 flex items-center">
                <FaRegClock className="mr-2" />
                <span>Submitted: {new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            {/* Creator Info */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-8">
              {project.userId && project.userId.avatar && (
                <img 
                  src={project.userId.avatar} 
                  alt={`${project.userId.firstName} ${project.userId.lastName}`} 
                  className="w-16 h-16 rounded-full border-2 border-white shadow mr-4 object-cover"
                />
              )}
              <div>
                {project.userId && (
                  <>
                    <div className="flex items-center mb-1">
                      <FaUser className="text-indigo-500 mr-2" />
                      <h3 className="text-lg font-semibold">
                        {project.userId.firstName} {project.userId.lastName}
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaEnvelope className="text-gray-400 mr-2" />
                      {project.userId.email}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Project Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
              <div className="prose max-w-none text-gray-600">
                <p>{project.description}</p>
              </div>
            </div>
            
            {/* Project Resources */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaBriefcase className="mr-2 text-indigo-500" />
                Resources
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-600">
                <p>{project.resources}</p>
              </div>
            </div>
            
            {/* Additional Project Details */}
            {project.link && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Link</h2>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  Visit Project <FaExternalLinkAlt className="ml-2 text-xs" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aproject;