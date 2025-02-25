import React from 'react';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl">
        {/* Cover Photo */}
        <div className="relative w-full h-40 bg-blue-200 rounded-t-lg">
          <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
            📷
          </button>
        </div>

        {/* Profile Info */}
        <div className="relative flex flex-col items-center p-4">
          <div className="relative -mt-16 w-32 h-32 bg-gray-300 rounded-full border-4 border-white flex items-center justify-center">
            <span className="text-4xl">+</span>
          </div>
          <h2 className="text-2xl font-bold mt-2">Brian Makanda</h2>
          <p className="text-gray-600">Nairobi, Nairobi County, Kenya • <a href="#" className="text-blue-600">Contact info</a></p>
          <p className="text-gray-600">243 connections</p>

          {/* University */}
          <div className="flex items-center space-x-2 mt-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Moi_University_Logo.png" alt="Moi University" className="w-6 h-6" />
            <p className="text-gray-700">Moi University</p>
          </div>

          {/* Buttons */}
          <div className="flex space-x-2 mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Open to</button>
            <button className="border px-4 py-2 rounded-lg hover:bg-gray-200">Add profile section</button>
            <button className="border px-4 py-2 rounded-lg hover:bg-gray-200">Enhance profile</button>
            <button className="border px-4 py-2 rounded-lg hover:bg-gray-200">Resources</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
