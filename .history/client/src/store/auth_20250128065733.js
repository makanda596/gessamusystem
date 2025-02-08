import { create } from 'zustand';
import axios from 'axios'

// const API_URL = process.env.MODE === "development" ? "http://localhost:5000/auth" : "/auth"
const USER_API = "http://localhost:5000/auth"
const adm_API = "http://localhost:5000/admin"
export const useAuthStore = create((set) => ({ //a one argument and a callback function 
    user: {},
    isAuthenticated: false,
    isLoading: false,
    error: null,
    messages: null,
    isCheckingAuth: true,
    message: null,
    email: ""
    // signup part
    signup: async (firstName, lastName, admNo, year, email, password) => {
        set({ isLoading: true, error: null })
        try {

            const response = await axios.post("http://localhost:5000/auth/signup", { firstName, lastName, admNo, year, email, password }); //we sending this to the server
            set({ user: response.data.user, isLoading: false })//updatyes the state of the useAuthstore 
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false });  // Error: show error message
            throw error;
        }
    },

    //admin signup
    // adminSignup = async ()
    //adminLogin
    adminLogin: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${adm_API}/adminLogin`, { email, password })
            set({ admin: response.data.admin, email: email, isLoading: false, isAuthenticated: true, error: null })
        } catch (error) {
            set({ error: error.response.data.message || "Error loging up", isLoading: false });  // Error: show error message
            throw error;
        }
    },

    login: async (admNo, password) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post("http://localhost:5000/auth/login", { admNo, password });
            localStorage.setItem("token", response.data.token);
            set({ user: response.data.user, email: email, isAuthenticated: true, error: null, isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message || "Error loging up", isLoading: false });  // Error: show error message
            throw error;
        }
    },

    //adminLogin
    // adminlogin: async (email, password) => {
    //     set({ isLoading: true, error: null })
    //     try {
    //         const response = await axios.post(`${API_URL}/adminlogin`, { email, password });
    //         localStorage.setItem("token", response.data.token);
    //         set({ admin: response.data.admin, isAuthenticated: true, error: null, isLoading: false })
    //     } catch (error) {
    //         set({ error: error.response.data.message || "Error loging up", isLoading: false });  // Error: show error message
    //         throw error;
    //     }
    // },
    //logout part
    logout: async () => {
        try {
            await axios.post(`${USER_API}/logout`, null, { withCredentials: true })
            set({ user: null, isAuthenticated: false, isCheckingAuth: false },)
        } catch (error) {
            set({ error: error.response.data.message || "Error loginout", isLoading: false });  // Error: show error message
            throw error;
        }
    },

    // sending reset-password 
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${USER_API}/password`, { email });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error sending reset password email",
            });
            throw error;
        }
    },

    //reset password
    // resetPassword: async (token, password) => {
    //     try {
    //         const response = await axios.post(`http://localhost:5000/auth/reset-password/${token}`, { password });
    //         set({ message: response.data.message, isLoading: false })
    //     } catch (error) {
    //         set({
    //             isLoading: false,
    //             error: error.response.data.message || "Error resetting password",
    //         });
    //         throw error;
    //     }
    // },

    //verfy email
    // verifyEmail: async (code) => {
    //     set({ isLoading: true, error: null });
    //     try {
    //         const response = await axios.post("http://localhost:5000/auth/verify-email", { code })
    //         set({ user: response.data.user, isAuthenticated: true })
    //         return response.data;
    //     } catch (error) {
    //         set({ error: error.response.data.message || "Error verifyng your email", isLoading: false });  // Error: show error message
    //         throw error;
    //     }
    // },

    // //chechking authoticTED users
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null })
        try {
            const token = localStorage.getItem("token"); // Retrieve the token from local storage
            const response = await axios.get("http://localhost:5000/auth/check-auth", {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the token to the Authorization header
                },
                withCredentials: true
            })
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({
                isAuthenticated: false,
                isCheckingAuth: false,
                error: error.response?.data?.message || "Failed to authenticate",
            });
        }
    },

    getProjects: async () => {
        try {
            const response = await axios.get('http://localhost:5000/task/takeTask')
            set({ tasks: response.data.tasks })
        } catch (error) {
            console.log(error)
        }
    },

    postTask: async (title, description, date, level) => {
        try {
            const response = await axios.post("http://localhost:5000/task/makeTask", { title, description, date, level })
            set({ task: response.task })
        } catch (error) {
            console.log(error)
        }
    }
}))


