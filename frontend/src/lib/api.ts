import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    // baseURL:import.meta.env.VITE_BASE_URL,
    withCredentials: true, // Crucial for cookie-based auth
});

// Add a request interceptor to prevent caching
api.interceptors.request.use((config) => {
    // Check if the method is GET
    if (config.method === 'get') {
        config.params = { ...config.params, _t: Date.now() };
    }
    return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized - clear local auth state if necessary
            // e.g. window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
