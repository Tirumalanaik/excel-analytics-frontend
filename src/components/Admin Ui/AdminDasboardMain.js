import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; // ✅ useLocation added
import '../../style/AdminDashboard.css';
import { FaEnvelope, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const AdminDashboardMain = () => {
    const navigate = useNavigate();
    const location = useLocation(); // ✅ You missed this line

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'admin') {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div>
                    <div className="logo">Sora Analytics</div>
                    <div className="nav-menu">
                        {/* ✅ Correct active path check using location.pathname */}
                        <NavItem icon={<MdDashboard />} text="Dashboard" path="/admin/dashboard" active={location.pathname === '/admin/dashboard'} />
                        <NavItem icon={<FaEnvelope />} text="Email" path="/admin/email" active={location.pathname === '/admin/email'} />
                        <NavItem icon={<FaUser />} text="Profile" path="/admin/profile" active={location.pathname === '/admin/profile'} />
                        <NavItem icon={<FaCog />} text="Settings" path="/admin/settings" active={location.pathname === '/admin/settings'} />
                    </div>
                </div>
                <div className="signout-section">
                    <button
                        className="signout-btn"
                        onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('role');
                            navigate('/login');
                        }}
                    >
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
};

const NavItem = ({ icon, text, active, badge, path }) => {
    const navigate = useNavigate();
    return (
        <div className={`nav-item ${active ? 'active' : ''}`} onClick={() => path && navigate(path)}>
            <div className="nav-label">
                {icon}
                <span>{text}</span>
            </div>
            {badge && <span className="badge">{badge}</span>}
        </div>
    );
};

export default AdminDashboardMain;
