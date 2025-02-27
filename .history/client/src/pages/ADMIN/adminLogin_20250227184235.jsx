import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/auth';
import logo from '../../assets/logo.jpg'
const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {error } = useAuthStore();

    axios.defaults.withCredentials = true;

    // knsknx
    const handleSubmit = async (e)=>{
        e.preventDefault() 
        try{
            const response = await axios.post('https://gessamusystem1.vercel.app/admin/adminLogin',
        {email,password},
        {withCredentials:true}) 
        console.log(response.data) 
        window.location.href="/adminDashboard"
    }
    catch(error){
        console.log(error.message)
    }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 to-green-600">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img
                        src={logo} // Replace with actual logo path
                        alt=""
                        className="w-20 h-20"
                    />
                </div>

                {error && <p className="text-red-600 text-center mb-4 font-medium">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                placeholder="Enter your password"
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </span>
                        </div>
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="mr-2 accent-green-600"
                        />
                        <label htmlFor="rememberMe" className="text-gray-700">
                            Remember me
                        </label>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
                    >
                        Log In
                    </button>
                </form>

                {/* Forgot Password and Signup Links */}
                <div className="text-center mt-4">
                    <p>
                        <a href="/forgot-password" className="text-green-700 hover:text-green-800">
                            Forgot your password?
                        </a>
                    </p>
                    
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
