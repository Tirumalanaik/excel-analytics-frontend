import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Upload from './pages/Upload';
import UploadHistory from './pages/UploadHistory';
import Dashboard from './pages/Dashboard';
import Analyze from './pages/Analyze';
import ViewChart from './pages/ViewChart';
import Adminpanel from './pages/Adminpanel';
import Email from './components/Admin Ui/Email/Email';
import Profile from './components/Admin Ui/Profile';
import Settings from './components/Admin Ui/Setting';
import AdminDashboardMain from './components/Admin Ui/AdminDasboardMain';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import OAuthRedirect from './pages/OAuthRedirect';

import './style/App.css';
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const AppWrapper = () => {
    const location = useLocation();

    // Hide navbar on these routes
    const hideNavbarRoutes = ['/', '/login', '/register', '/oauth'];
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

    return (
        <>
            {!shouldHideNavbar && <Navbar />}

            <div className="main-content">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/oauth" element={<OAuthRedirect />} />

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/uploads" element={<ProtectedRoute><UploadHistory /></ProtectedRoute>} />
                    <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
                    <Route path="/analyze/:id" element={<Analyze />} />
                    <Route path="/view-chart/:id" element={<ProtectedRoute adminOnly={true}><ViewChart /></ProtectedRoute>} />
                    <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />

                    {/* Admin Routes (nested) */}
                    <Route path="/admin/*" element={
                        <ProtectedRoute adminOnly={true}>
                            <AdminDashboardMain />
                        </ProtectedRoute>
                    }>
                        <Route path="dashboard" element={<Adminpanel />} />
                        <Route path="email" element={<Email />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>

            <Footer />
        </>
    );
};

function App() {
    return (
        <Router>
            <AppWrapper />
        </Router>
    );
}

export default App;
