 import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../style/Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const navigate = useNavigate();
    const email = localStorage.getItem('email') || 'User';

    useEffect(() => {
        const fetchUploads = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/upload', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUploadedFiles(res.data);
            } catch (err) {
                console.error("Error fetching uploads:", err);
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchUploads();
    }, [navigate]);
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/upload/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUploadedFiles(prev => prev.filter(file => file._id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };




    return (
        <div className="dashboard-container">
            <section className="welcome">
                <h2>Welcome back, {email.split('@')[0]}</h2>
                <p>Here's an overview of your Excel analytics</p>
            </section>

            <section className="stats">
                <Link to="/upload" className="stat-card upload">
                    <p>📤</p>
                    <h3>Upload Excel File</h3>
                    <p>Import new data for analysis</p>
                </Link>
                <div className="stat-card charts">
                    <h3>{uploadedFiles.length}</h3>
                    <p>Charts created</p>
                </div>
                <div className="stat-card files">
                    <h3>{uploadedFiles.length}</h3>
                    <p>Files uploaded</p>
                </div>
            </section>

            <section className="recent-files">
                <div className="files-header">
                    <h3>Recent Files</h3>
                    <Link to="/upload">+ Upload</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Date Uploaded</th>
                            <th>Size</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uploadedFiles.length === 0 ? (
                            <tr>
                                <td colSpan="4">No uploads found.</td>
                            </tr>
                        ) : (
                            uploadedFiles.map((file, index) => (
                                <tr key={index}>
                                    <td>{file.originalname || 'N/A'}</td>
                                    <td>{file.createdAt ? new Date(file.createdAt).toLocaleDateString() : 'N/A'}</td>
                                    <td>{file.size ? (file.size / 1024).toFixed(1) : 'N/A'} KB</td>
                                    <td>
                                        <Link to={`/analyze/${file._id}`} className="analyze">Analyze</Link>
                                        {' | '}
                                        <button className="delete" onClick={() => handleDelete(file._id)}>Delete</button>

                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Dashboard;
