import axios from 'axios'
import {create} from 'zustand'

export const postAuthStore = create((set)=>({
    image:"",
    error:"",

    postImage: async (image)=>{
        try {
            const response = await axios.post('http://localhost:5000/images/oneImage',{image})
            set({ image: response.data })
            console.log({ image: response.data })
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },
}))