import React, { useState } from 'react';
import { FaSearch, FaBell, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";


const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [firstName, setFirstName] = useState('Brian');
  const [lastName, setLastName] = useState('Makanda');
  const [location, setLocation] = useState('Nairobi, Kenya');
  const [university, setUniversity] = useState('Moi University');

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
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-96 h-40 md:h-60 bg-gray-300 relative">
        {backgroundImage && <img src={backgroundImage} alt="Background" className="w-64 h-full object-cover" />}
        <label
          htmlFor="background-upload"
          className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded cursor-pointer text-2xl hover:bg-gray-800"
        >
          +
        </label>
        <input
          type="file"
          id="background-upload"
          className="hidden"
          onChange={handleBackgroundImageChange}
        />
      </div>

      {/* Profile Picture */}
      <div className="relative -mt-12 md:-mt-16">
        <FaUserCircle
          alt="Profile"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md"
        />
        <label
          htmlFor="profile-upload"
          className="absolute text-2xl bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600"
        >
          +
        </label>
        <input
          type="file"
          id="profile-upload"
          className="hidden"
          onChange={handleProfilePictureChange}
        />
      </div>

      {/* User Details */}
      <div className="mt-4 text-center">
        <h1 className="text-xl md:text-2xl font-bold">{firstName} {lastName}</h1>
        <p className="text-gray-600">{location}</p>
        <p className="text-gray-600 font-semibold mt-1">{university}</p>
      </div>
    </div>
  );
};

export default Profile;
