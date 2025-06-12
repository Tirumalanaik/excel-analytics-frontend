import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
            localStorage.clear();
            return <Navigate to="/login" />;
        }

        if (adminOnly && decoded.role !== 'admin') {
            return <Navigate to="/" />; // redirect non-admins
        }

        return children;
    } catch (err) {
        localStorage.clear();
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
