// services/adminapi.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/admin',
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Existing
export const fetchUsers = () => API.get('/users');
export const fetchUploads = () => API.get('/uploads');
export const fetchCharts = () => API.get('/charts');
export const fetchStats = () => API.get('/stats');

// 🔐 Admin Profile APIs
// services/adminapi.js
export const fetchAdminProfile = () => axios.get('/api/profile'); // ✅ updated from /api/admin/profile

export const updateAdminProfile = (formData) => API.put('/profile', formData);
export const updateAdminPassword = (data) => API.put('/profile/password', data);

// 2FA APIs
export const toggle2FAEnable = () => API.post('/profile/2fa/enable');
export const toggle2FADisable = () => API.post('/profile/2fa/disable');
