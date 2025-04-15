import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/auth'
import { FaRegClock, FaBriefcase, FaPlus, FaExternalLinkAlt } from 'react-icons/fa'
import SubmitProject from '../components/SubmitProject'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const AlluserProjects = () => {
  const { allProjects, getallProjetcs } = useAuthStore()
  const [isPopup, setIsPopup] = useState(false)

  useEffect(() => {
    getallProjetcs()
  }, [])

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-0 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 p-2">
          <div>
              <h1 className="text-xl font-bold text-gray-900 ">postedProjects </h1>
            <p className="text-gray-600 mt-2">
              Explore projects shared by our alumni and students in the geospatial field.
            </p>

          </div>
          <button
            onClick={() => setIsPopup(true)}
            className="inline-flex items-center px-2 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
          post Project
          </button>
        </div>

        {isPopup && <SubmitProject isPopup={isPopup} setIsPopup={setIsPopup} />}

        {allProjects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-10 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-indigo-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-indigo-500 text-3xl">📁</span>
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                No Projects Found
              </h2>
              <p className="text-gray-600 mb-6">
                Get started by submitting your first project!
              </p>
              <button
                onClick={() => setIsPopup(true)}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <FaPlus className="mr-2" /> Create New Project
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allProjects.map((project) => (
              <div
                key={project._id}
                className="bg-blue-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col"
              >
                {/* User Information at the top */}
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-center">
                    {project.userId.avatar && (
                      <img
                        src={project.userId.avatar}
                        alt={`${project.userId.firstName} ${project.userId.lastName}`}
                        className="w-10 h-10 rounded-full mr-3 border-2 border-blue-400 object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">
                        {project.userId.firstName} {project.userId.lastName}
                      </div>
                      <div className="text-xs text-gray-500">{project.userId.email}</div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <FaRegClock className="mr-1" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {project.image ? (
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                )}

                <div className="p-3 flex-grow">
                  <div className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    title: {project.title}
                  </div>

                  <p className="text-gray-600 text-md mb-3 ">
                    <span className='text-black font-semibold'> description:</span> {project.description.length > 40 ? <p>{project.description.slice(0,40)}.........</p> : <p>{project.description}</p> }
                  </p>

                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-700 mb-2">
                      <FaBriefcase className="mr-2 text-indigo-500" />
                      <span className="font-medium">Resources</span>
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2 pl-6">
                      {project.resources}
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                  <Link to={`/project/${project._id}`} className="w-full text-indigo-600 text-sm font-medium flex items-center justify-center hover:text-indigo-800 transition-colors">
                    View Details <FaExternalLinkAlt className="ml-2 text-xs" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default AlluserProjects