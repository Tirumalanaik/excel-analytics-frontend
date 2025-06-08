import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    const [showDropdown, setShowDropdown] = useState(false);
    const [language, setLanguage] = useState('EN');
    const [theme, setTheme] = useState('dark');

    const userEmail = localStorage.getItem('email') || 'user@example.com';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/login');
    };

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

    const handleThemeToggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.body.className = newTheme === 'dark' ? 'dark-mode' : 'light-mode';
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    useEffect(() => {
        // Set initial theme class
        document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode';
    }, [theme]);
    

    return (
        <nav className="navbar">
            <div className="navbar-title">📊 Sora Analytics</div>

            <div className="navbar-controls">
                <select value={language} onChange={handleLanguageChange} className="language-select">
                    <option value="EN">EN</option>
                    <option value="HI">HI</option>
                    <option value="ES">ES</option>
                </select>

                <button onClick={handleThemeToggle} className="theme-toggle">
                    {theme === 'dark' ? '🌞' : '🌙'}
                </button>
            </div>

            <ul className="navbar-links">
                {isLoggedIn ? (
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/upload">Upload</Link></li>
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
