import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const [showDropdown, setShowDropdown] = useState(false);
    const [language, setLanguage] = useState('EN');
    const [theme, setTheme] = useState('dark');

    const userEmail = localStorage.getItem('email') || 'user@example.com';

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode';
    }, [theme]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        navigate('/login');
    };

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

   
    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    // 👉 Don't render if admin is logged in
    if (role === 'admin') return null;

    return (
        <nav className="navbar">
            <div className="navbar-title">📊 Sora Analytics</div>

            <div className="navbar-controls">
                <select value={language} onChange={handleLanguageChange} className="language-select">
                    <option value="EN">EN</option>
                    <option value="HI">HI</option>
                    <option value="ES">ES</option>
                </select>

               
            </div>

            <ul className="navbar-links">
                {isLoggedIn ? (
                    <>
                        {/* Show Dashboard and Upload only if NOT admin */}
                        {role !== 'admin' && (
                            <>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><Link to="/upload">Upload</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </>
                        )}
                        <li className="email-dropdown">
                            <button onClick={toggleDropdown} className="email-btn">
                                {userEmail}
                            </button>
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
