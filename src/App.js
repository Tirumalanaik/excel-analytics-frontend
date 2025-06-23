import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';


import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './style/App.css';
import Upload from './pages/Upload';
import UploadHistory from './pages/UploadHistory';
import Dashboard from './pages/Dashboard'; // ✅ import real dashboard
import Analyze from './pages/Analyze';
import { Navigate } from 'react-router-dom';
import Adminpanel from './pages/Adminpanel';
import ProtectedRoute from './components/ProtectedRoute';
import ViewChart from './pages/ViewChart';
import AdminDashboardMain from './components/Admin Ui/AdminDasboardMain';
import Email from './components/Admin Ui/Email/Email';
import Profile from './components/Admin Ui/Profile';


import Settings from './components/Admin Ui/Setting';

//const Admin = () => <h2 className="dashboard">Welcome to admin Dashboard</h2>;

function App() {
    return (
        <Router>
            <Navbar />
            <div className="main-content">
                <Routes>
                    {/* ADMIN ROUTES */}
                    <Route path="/admin/*" element={
                        <ProtectedRoute adminOnly={true}>
                            <AdminDashboardMain />
                        </ProtectedRoute>
                    }>
                        {/* This nested route renders inside <Outlet /> in AdminDashboardMain */}
                        <Route path="dashboard" element={<Adminpanel />} />
                        <Route path="email" element={<Email />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="settings" element={<Settings />} />  
                        {/* You can add more like: */}
                        {/* <Route path="charts" element={<Charts />} /> */}
                    </Route>

                    {/* REDIRECT to login by default */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* AUTH & USER ROUTES */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/uploads" element={<ProtectedRoute><UploadHistory /></ProtectedRoute>} />
                    <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
                    <Route path="/analyze/:id" element={<Analyze />} />
                    <Route path="/view-chart/:id" element={<ProtectedRoute adminOnly={true}><ViewChart /></ProtectedRoute>} />
                    <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />

                </Routes>

            </div>
            <Footer />
        </Router>
    );
}

export default App;
