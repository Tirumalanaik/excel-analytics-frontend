import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
            localStorage.removeItem('token');
            return <Navigate to="/login" />;
        }

        return children;
    } catch (err) {
        localStorage.removeItem('token');
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
