import { create } from 'zustand';
import axios from 'axios';

// Set your API endpoints
const BACKEND_URL = "http://localhost:5000";

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    messages: null,
    isCheckingAuth: true,
    message: null,    
    // Signup method
    signup: async (firstName, lastName, email, phoneNumber, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/signup`, { firstName, lastName,  email, phoneNumber, password });
            set({ user: response.data.user, isLoading: false, isAuthenticated: true });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
            throw error;
        }
    },

    // Admin Login
    adminLogin: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post('https://gessamusystem.onrender.com/adminLogin', { email, password });
            set({ admin: response.data.admin, isAuthenticated: true, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        } 
    },

    // User Login
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            console.log("Attempting login with", { email, password });
            const response = await axios.post(`${import.meta.env.BACKEND_URL}/auth/login`, { email, password });
            localStorage.setItem("token", response.data.token);
            console.log("Token Set in LocalStorage:", localStorage.getItem("token"));
            set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: null });
            console.log("Login Response:", response.data);
        } catch (error) {
            console.error("Login Error:", error);
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },

    // Logout 
    logout: async () => {
        try { 
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, null, { withCredentials: true });
            localStorage.removeItem("token");
            set({ user: null, isAuthenticated: false, isCheckingAuth: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging out", isLoading: false });
            throw error;
        }
    },

    // Forgot Password
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/password`, { email });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error sending reset password email", isLoading: false });
            throw error;
        }
    },

    // Check Auth Status
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/check-auth`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({
                isAuthenticated: false,
                isCheckingAuth: false,
                error: error.response?.data?.message || "Failed to authenticate",
            });
        }
    },

    // Get Projects
    getProjects: async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/auth/task/takeTask`);
            set({ tasks: response.data.tasks });
        } catch (error) {
            console.log(error);
        }
    },

    // Post Task
    postTask: async (title, description, date, level) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/task/makeTask`, { title, description, date, level });
            set({ task: response.data.task });
        } catch (error) {
            console.log(error);
        }
    },

    // Post Project
    postProject: async (title, description, year, reference) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/projects/sendprojects`, { title, description, year, reference });
            set({ project: response.data.project });
        } catch (error) {
            console.log(error.message);
        }
    },
}));
