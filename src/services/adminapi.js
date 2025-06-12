import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/admin',
});

// Attach token dynamically to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Admin APIs
export const fetchUsers = () => API.get('/users');
export const fetchUploads = () => API.get('/uploads');
export const fetchCharts = () => API.get('/charts');
export const fetchStats = () => API.get('/stats');
