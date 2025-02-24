import React, { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/auth';
import logo from '../assets/logo.jpg';
import gis from '../assets/gis.webp'; // Import your background image

const LoginPage = () => {
  const [admNo, setAdmNo] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuthStore();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(admNo, password, { withCredentials: true });
      window.location.href = '/dashboard';
    } catch (error) {
      console.log(error.response ? error.response.data.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen text-black flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${gis})` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="bg-blue-600 shadow-lg rounded-lg p-6 w-full max-w-md z-10">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Gessamu Logo" className="w-20 h-20" />
        </div>

        {error && <p className="text-red-500 text-center mb-2 font-bold">{error}</p>}

        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Reg. Number</label>
              <input
                type="text"
                value={admNo}
                onChange={(e) => setAdmNo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Reg. Number"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-white font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Password"
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

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-white">Remember me</label>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-blue-600 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              Log In
            </button>
          </form>
        )}

        {!loading && (
          <div className="text-center mt-2">
            <p>
              <a href="/forgot-password" className="text-white">
                Forgot your password?
              </a>
            </p>
            <p className="mt-2">
              <a href="/signup" className="text-white">
                Don't have an account? <span className="text-black font-bold">Sign up here.</span>
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
