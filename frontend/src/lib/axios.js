import axios from 'axios';

const URL = 
    import.meta.env.VITE_API_BASE_URL || 
    "http://localhost:5000";

export const axiosInstance = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json", }
});