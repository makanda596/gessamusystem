import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    // Logic to save settings
    alert('Settings saved successfully!');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Settings</h1>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="text-gray-700">Enable Notifications</label>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
          </div>
          <div className="mb-6 flex items-center justify-between">
            <label className="text-gray-700">Dark Mode</label>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
