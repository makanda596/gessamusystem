import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios'
import { useParams } from 'react-router-dom';


const Settings = () => {
    const { id } = useParams()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    // const [profilePicture, setProfilePicture] = useState(null);
    const [password, setPassword] = useState('');
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('English');
    const [privacy, setPrivacy] = useState('Public');
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    const handleDeleteAccount = () => {
        setShowDeletePopup(true);
    };

    const confirmDeleteAccount = async () => {
        try{
         await axios.delete(`https://gessamubackend.onrender.com/auth/deleteUser/${id}`)
         window.location.href="/"
        }
        catch(error){
            console.error("Error deleting account:", error);
            
        }
        setShowDeletePopup(false);
        alert('Your account has been deleted.');
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center w-full">
                <h1 className="text-2xl font-bold text-blue-600 mb-6">Settings</h1>
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl flex">
                    <div className="w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-700">Profile Picture</label>
                                <input
                                    type="file"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            onClick={handleDeleteAccount}
                        >
                            Delete Account
                        </button>
                    </div>
                    <div className="w-1/4 flex flex-col items-center">
                        <FaUserCircle className="text-4xl h-32 w-32 rounded-full mb-4" />
                        <button className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition-all">Logout</button>
                    </div>
                </div>
            </div>
            {showDeletePopup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold">Close Account</h2>
                        <p className="text-gray-700 mt-2">Are you sure you want to delete your account? You will lose all your data.</p>
                        <div className="mt-4 flex justify-end gap-4">
                            <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowDeletePopup(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={confirmDeleteAccount}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Settings;
