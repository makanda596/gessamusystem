import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import Navbar from "../components/Navbar";
import bg from '../assets/bg.jpg'
import { useAuthStore } from "../store/auth";
import TaskCount from "../components/taskCount";

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null); 
     const { fetchUserInfo ,user}=useAuthStore()
  

  useEffect(() => {
    fetchUserInfo()

  }, []);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBackgroundImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gray-100 ">
        {/* Background Cover */}
        <div className="w-full h-48 md:h-64 bg-gray-300 relative rounded-b-lg shadow-md overflow-hidden">
          
            <img src={bg} alt="Background" className="w-full h-full  object-cover" />
        
          <label
            htmlFor="background-upload"
            className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-black/70 transition-all"
          >
            <FaCamera size={18} />
          </label>
          <input type="file" id="background-upload" className="hidden" onChange={handleBackgroundImageChange} />
        </div>

        {/* Profile Picture */}
        <div className="relative -mt-16 md:-mt-20">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg overflow-hidden">
            <img
              src={profilePicture || user?.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <label
            htmlFor="profile-upload"
            className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition-all"
          >
            <FaCamera size={18} />
          </label>
          <input type="file" id="profile-upload" className="hidden" onChange={handleProfilePictureChange} />
        </div>

        {/* User Details */}
        <div className="mt-4 text-center">
          {user ? (
            <>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-500">{user.location || "Location not set"}</p>
              <p className="text-gray-600">{user.email || "Email not set"}</p>
              <p className="text-gray-600">{user.phoneNumber || "phonenumber not set"}</p>
              <p className="text-gray-700 font-semibold mt-2">{user.university || "University not set"}</p>
            </>
          ) : (
            <p className="text-gray-500">Loading profile...</p>
          )}
        </div>
        <TaskCount/>
      </div>
    </>
  );
};

export default Profile;
