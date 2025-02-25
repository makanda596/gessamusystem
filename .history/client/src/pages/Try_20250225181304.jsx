import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaUserCircle } from "react-icons/fa";
import { useAuthStore } from "../store/auth";
import axios from "axios";

const Settings = () => {
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const { logout, user } = useAuthStore();

  // Fetch user details when component loads
  useEffect(() => {
    if (user) {
      setUserId(user._id);
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const response = await axios.put(
        `https://gessamubackend.onrender.com/auth/updateUser/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("Settings updated successfully!");
    } catch (error) {
      setMessage("Error updating settings: " + error.response?.data?.message);
    }
  };

  const deleteStudent = async () => {
    if (!userId) return;

    try {
      await axios.delete(`https://gessamubackend.onrender.com/auth/deleteUser/${userId}`);
      setMessage("Account deleted successfully!");
      logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error);
      setMessage("Error deleting account.");
    }
    setShowDeletePopup(false);
  };

  return (
    <>
      <Navbar />
      {message && <div className="bg-green-500 text-white p-3 rounded mb-4 text-center">{message}</div>}

      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Settings</h1>
        <div className="bg-white p-14 rounded-lg shadow-md w-full max-w-4xl flex">
          <div className="w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700">Profile Picture</label>
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
              </div>
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all mt-6"
              onClick={handleSave}
            >
              Save Changes
            </button>
            <button
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-all mt-4"
              onClick={() => setShowDeletePopup(true)}
            >
              Delete Account
            </button>
          </div>
          <div className="w-1/4 flex flex-col items-center">
            <FaUserCircle className="text-4xl h-32 w-32 rounded-full mb-4" />
            <button
              onClick={() => logout().then(() => (window.location.href = "/"))}
              className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {showDeletePopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold">Close Account</h2>
            <p className="text-gray-700 mt-2">
              Are you sure you want to delete your account? You will lose all your data.
            </p>
            <div className="mt-4 flex justify-end gap-4">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowDeletePopup(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={deleteStudent}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
