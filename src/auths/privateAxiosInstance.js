import axios from "axios";

const privateAxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000,
    withCredentials: true,
});

// Request interceptor: attach token to every request
privateAxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export default privateAxiosInstance;