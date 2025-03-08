import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  // Fetch user info when component loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await axios.get("http://localhost:5000/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
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
      <div className="min-h-screen flex flex-col items-center bg-gray-100">
        {/* Background Cover */}
        <div className="w-full h-40 md:h-60 bg-gray-300 relative">
          {backgroundImage && (
            <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
          )}
          <label
            htmlFor="background-upload"
            className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded cursor-pointer text-2xl hover:bg-gray-800"
          >
            +
          </label>
          <input type="file" id="background-upload" className="hidden" onChange={handleBackgroundImageChange} />
        </div>

        {/* Profile Picture */}
       

        {/* User Details */}
        <div className="mt-4 text-center">
          {user ? (
            <>
             <div className="relative -mt-12 md:-mt-16">
          {profilePicture ? (
            <img
              src={user.avatar}
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 md:w-32 md:h-32 text-gray-500 rounded-full border-4 border-white shadow-md" />
          )}
          <label
            htmlFor="profile-upload"
            className="absolute text-2xl bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600"
          >
            +
          </label>
          <input type="file" id="profile-upload" className="hidden" onChange={handleProfilePictureChange} />
        </div>
              <h1 className="text-xl md:text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600">{user.location || "Location not set"}</p>
              <p className="text-gray-600">{user.email || "Location not set"}</p>
              <p className="text-gray-600 font-semibold mt-1">{user.university || "University not set"}</p>
            </>
          ) : (
            <p className="text-gray-500">Loading profile...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
