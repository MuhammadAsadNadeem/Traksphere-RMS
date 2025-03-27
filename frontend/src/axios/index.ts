import axios, { InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
    baseURL: "https://traksphere-rms-backend-production.up.railway.app/",
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
