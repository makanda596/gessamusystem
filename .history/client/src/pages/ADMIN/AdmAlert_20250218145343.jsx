import React, { useState } from 'react';
import axios from 'axios';

const AdmAlert = () => {
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const postAlert = async () => {
    if (!message || !userId) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post('https://gessamubackend.onrender.com/alert/makeAlert', { message, userId });
      setSuccess('Alert sent successfully!');
      setMessage('');
      setUserId('');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send alert.');
      setSuccess(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Admin Alert</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center mb-2">{success}</p>}

        {/* Alert Input */}
        <input
          type="text"
          placeholder="Enter your alert message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        />

        {/* User ID Input */}
        <input
          type="text"
          placeholder="Enter the user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        {/* Send Button */}
        <button
          onClick={postAlert}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          SEND ALERT
        </button>
      </div>
    </div>
  );
};

export default AdmAlert;
