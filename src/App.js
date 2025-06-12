import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

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



//const Admin = () => <h2 className="dashboard">Welcome to admin Dashboard</h2>;

function App() {
    return (
        <Router>
            <Navbar />
            <div className="main-content">
                <Routes>
                    <Route path="/admin" element={
                        <ProtectedRoute adminOnly={true}>
                            <Adminpanel />
                        </ProtectedRoute>
                    } />
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/uploads" element={<ProtectedRoute><UploadHistory /></ProtectedRoute>} />
            
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={
                        <ProtectedRoute adminOnly={true}>
                            <Adminpanel />
                        </ProtectedRoute>
                    } />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
                    <Route path="/analyze/:id" element={<Analyze />} />

                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
