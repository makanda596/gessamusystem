// // src/store/useAuthStore.js

import { create } from 'zustand';
import axios from 'axios';

// Configure API URLs using environment variables for flexibility
const USER_API = process.env.REACT_APP_USER_API || "http://localhost:5000/auth";
const ADM_API = process.env.REACT_APP_ADM_API || "http://localhost:5000/admin";

export const useAuthStore = create((set) => ({
    // Initial State
    user: null,
    admin: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    messages: null,
    isCheckingAuth: true,
    message: null,
    email: "",
    tasks: [], // Initialize tasks as an empty array
    task: null, // Initialize single task as null

    // Signup for Regular Users
    signup: async (firstName, lastName, admNo, year, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${USER_API} / signup`, {
                firstName,
                lastName,
                admNo,
                year,
                email,
                password,
            });
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error signing up",
                isLoading: false,
            });
            throw error;
        }
    },

    // Admin Signup (Uncomment and implement if needed)
    // adminSignup: async (/* admin signup parameters */) => {
    //     // Implement admin signup logic here
    // },

    // Admin Login
    adminLogin: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${ADM_API}/adminLogin`, { email, password });
            set({
                admin: response.data.admin,
                isLoading: false,
                email: email,
                isAuthenticated: true,
                error: null,
            });
            console.log(response)
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error logging in",
                isLoading: false,
            });
            throw error;
        }
    },

    // User Login
    login: async (admNo, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${USER_API} / login`, { admNo, password });
            localStorage.setItem("token", response.data.token);
            set({
                user: response.data.user,
                isAuthenticated: true,
                error: null,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error logging in",
                isLoading: false,
            });
            throw error;
        }
    },

    // Logout
    logout: async () => {
        try {
            await axios.post(`${USER_API} / logout`, null, { withCredentials: true });
            set({
                user: null,
                admin: null,
                isAuthenticated: false,
                isCheckingAuth: false,
                error: null,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error logging out",
                isLoading: false,
            });
            throw error;
        }
    },

    // Forgot Password
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${USER_API} / password`, { email });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error sending reset password email",
            });
            throw error;
        }
    },

    // Reset Password (Uncomment and implement if needed)
    // resetPassword: async (token, password) => {
    //     set({ isLoading: true, error: null });
    //     try {
    //         const response = await axios.post(${USER_API}/reset-password/${token}, { password });
    //         set({ message: response.data.message, isLoading: false });
    //     } catch (error) {
    //         set({
    //             isLoading: false,
    //             error: error.response?.data?.message || "Error resetting password",
    //         });
    //         throw error;
    //     }
    // },

    // Verify Email (Uncomment and implement if needed)
    // verifyEmail: async (code) => {
    //     set({ isLoading: true, error: null });
    //     try {
    //         const response = await axios.post(${USER_API}/verify-email, { code });
    //         set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    //         return response.data;
    //     } catch (error) {
    //         set({
    //             error: error.response?.data?.message || "Error verifying your email",
    //             isLoading: false,
    //         });
    //         throw error;
    //     }
    // },

    // Check Authentication Status
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${USER_API} / check - auth`, {
                headers: {
                    Authorization: `${token}`,
                },
                withCredentials: true,
            });
            set({
                user: response.data.user,
                isAuthenticated: true,
                isCheckingAuth: false,
                error: null,
            });
        } catch (error) {
            set({
                isAuthenticated: false,
                isCheckingAuth: false,
                error: error.response?.data?.message || "Failed to authenticate",
                user: null,
                admin: null,
            });
        }
    },

    // Get Projects/Tasks
    getProjects: async () => {
        try {
            const response = await axios.get(`${USER_API} / task / takeTask`);
            set({ tasks: response.data.tasks });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error fetching tasks",
            });
            console.log(error);
        }
    },

    // Post/Create a Task
    postTask: async (title, description, date, level) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${USER_API} / task /makeTask`, {
                title,
                description,
                date,
                level,
            });
            set({ task: response.data.task, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error creating task",
            });
            console.log(error);
            throw error;
        }
    },
}));