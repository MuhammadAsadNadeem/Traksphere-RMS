import axios, { InternalAxiosRequestConfig } from 'axios';
import { routes } from '../routes';

const instance = axios.create({
    baseURL: "http://localhost:5000",
});

// Request Interceptor 
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor 
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {

            localStorage.clear();
            window.location.href = routes.login;
        }
        return Promise.reject(error);
    }
);

export default instance;
