import React from 'react'
import { useAuthStore } from '../store/auth'
import { useEffect, useState } from 'react'
import { FaRegClock, FaBriefcase, FaPlus } from 'react-icons/fa'
import axios from 'axios'
import SubmitProject from '../components/SubmitProject'
import { format } from 'date-fns'

const AlluserProjects = () => {
  const { allProjects, getallProjetcs } = useAuthStore()
  const [isPopup, setIsPopup] = useState(false)

  useEffect(() => {
    getallProjetcs()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">Community Projects</h1>
            <p className="text-gray-600 mt-2">Explore innovative projects from our community</p>
          </div>
          <button
            onClick={() => setIsPopup(true)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="text-lg" />
            Submit Project
          </button>
        </div>

        {/* Empty State */}
        {allProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 text-5xl mb-4">🚀</div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                No Projects Yet
              </h2>
              <p className="text-gray-600 mb-4">
                Be the first to share your project with the community!
              </p>
            </div>
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200"
              >
                {/* Project Image */}
                {project.image && (
                  <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Project Content */}
                <div className="p-6">
                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={project.userId.avatar || '/default-avatar.png'}
                      alt="Author"
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {project.userId.firstName} {project.userId.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{project.userId.email}</p>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-3">
                      {project.description}
                    </p>

                    {/* Resources */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <FaBriefcase className="mr-2 text-gray-500" />
                        <span className="font-medium">Required Resources</span>
                      </div>
                      <div className="text-sm text-gray-600 line-clamp-2">
                        {project.resources}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <FaRegClock className="text-gray-400" />
                        <span>
                          {format(new Date(project.createdAt), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Submission Modal */}
        <SubmitProject isPopup={isPopup} setIsPopup={setIsPopup} />
      </div>
    </div>
  )
}

export default AlluserProjects