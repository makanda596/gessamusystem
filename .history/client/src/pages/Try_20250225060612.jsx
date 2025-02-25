import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [privacy, setPrivacy] = useState('Public');

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
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <div className="mb-4 flex items-center justify-between">
            <label className="text-gray-700">Dark Mode</label>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Language</label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Privacy</label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Friends Only">Friends Only</option>
            </select>
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