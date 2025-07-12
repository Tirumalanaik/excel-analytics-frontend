import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios'; // ✅ Make sure to import axios

const OAuthRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { token, email, name, role } = queryString.parse(location.search);

        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            localStorage.setItem('name', name);
            localStorage.setItem('role', role);

            // ✅ Set token globally for all Axios requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // ✅ Navigate to the appropriate dashboard
            navigate(role === 'admin' ? '/admin' : '/dashboard');
        } else {
            navigate('/login');
        }

    }, [location, navigate]);

    return <p>Logging in via OAuth...</p>;
};

export default OAuthRedirect;
