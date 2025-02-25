import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '+123 456 7890',
    bio: 'Web Developer | Tech Enthusiast',
    profilePicture: 'https://via.placeholder.com/150',
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center w-full">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl text-center">
          <div className="flex flex-col items-center">
            <img src={user.profilePicture} alt="Profile" className="w-32 h-32 rounded-full shadow-md border-4 border-blue-500" />
            <h1 className="text-2xl font-semibold mt-4">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-600">{user.bio}</p>
            <div className="mt-4 text-gray-700">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phoneNumber}</p>
            </div>
            <button
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              onClick={() => alert('Edit Profile Feature Coming Soon!')}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;