import React, { useState, useEffect } from "react";
import { FaCamera, FaEdit } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationPin, MdSchool } from "react-icons/md";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/auth";
import TaskCount from "../components/taskCount";
import UserProjectCount from "../components/userProjectCount";

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const { fetchUserInfo, user } = useAuthStore();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Background Section */}
        <div className="relative h-48 md:h-60 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black/30">
            {backgroundImage && (
              <img
                src={backgroundImage}
                alt="Background cover"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <label className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 text-gray-800 px-4 py-2 rounded-full cursor-pointer hover:bg-white transition-all shadow-sm">
            <FaCamera className="text-lg" />
            <span className="text-sm font-medium">Change Cover</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleImageChange(e, setBackgroundImage)}
            />
          </label>
        </div>

        {/* Profile Content */}
        <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-16">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden">
                <img
                  src={profilePicture || user?.avatar || '/default-avatar.png'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
                <FaCamera className="text-gray-700 text-lg" />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setProfilePicture)}
                />
              </label>
            </div>

            <div className="flex-1 space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {user?.firstName} {user?.lastName}
              </h1>
              {user?.university && (
                <div className="flex items-center text-gray-600">
                  <MdSchool className="mr-2 text-lg" />
                  <span>{user.university}</span>
                </div>
              )}
              {user?.location && (
                <div className="flex items-center text-gray-600">
                  <MdLocationPin className="mr-2 text-lg" />
                  <span>{user.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <TaskCount />
                <UserProjectCount />
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="space-y-3">
                {user?.email && (
                  <div className="flex items-center text-gray-600">
                    <MdEmail className="mr-3 text-xl text-blue-500" />
                    <span>{user.email}</span>
                  </div>
                )}
                {user?.phoneNumber && (
                  <div className="flex items-center text-gray-600">
                    <MdPhone className="mr-3 text-xl text-green-500" />
                    <span>{user.phoneNumber}</span>
                  </div>
                )}
                {!user?.email && !user?.phoneNumber && (
                  <p className="text-gray-400 italic">No contact information provided</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Sections (Education, Skills, etc.) can be added here */}
        </div>
      </div>

      {/* Loading State */}
      {!user && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;