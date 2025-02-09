import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiHash, FiPhone } from 'react-icons/fi';
import { useAuthStore } from '../../../src/store/auth';

const CreateUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [admNo, setAdmNo] = useState('');
    const [email, setEmail] = useState('');
    const [year, setYear] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);  // State to control the modal popup

    const { signup } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signup(firstName, lastName, admNo, year, email, phoneNumber, password);
            setShowModal(true);  // Show success popup
            resetForm();
        } catch (error) {
            console.error(error.response ? error.response.data.message : 'Sign up failed');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setAdmNo('');
        setEmail('');
        setYear('');
        setPhoneNumber('');
        setPassword('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
            <div className="bg-white p-12 rounded-2xl shadow-2xl w-full max-w-4xl">
                <h1 className="text-5xl font-extrabold text-indigo-600 text-center mb-6">Create User Account</h1>
                <p className="text-gray-600 text-center mb-8 text-lg">Join us and start your journey with just a few clicks!</p>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="relative">
                        <FiUser className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="pl-10 w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="First Name"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div className="relative">
                        <FiUser className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="pl-10 w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Last Name"
                            required
                        />
                    </div>

                    {/* Admission Number */}
                    <div className="relative">
                        <FiHash className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="text"
                            value={admNo}
                            onChange={(e) => setAdmNo(e.target.value)}
                            className="pl-10 w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Admission Number"
                            required
                        />
                    </div>

                    {/* Email Address */}
                    <div className="relative">
                        <FiMail className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    {/* Year of Study */}
                    <div className="relative">
                        <FiHash className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="pl-10 w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Year of Study"
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                        <FiPhone className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="pl-10 w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Phone Number"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative col-span-2">
                        <FiLock className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal for success message */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg">
                        <h2 className="text-3xl font-bold text-green-600 mb-4">User Created Successfully!</h2>
                        <p className="text-gray-700 mb-6">Another user account has been created successfully.</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateUser;
