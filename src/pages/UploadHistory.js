import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/UploadHistory.css';

const UploadHistory = () => {
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/upload', {

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUploads(res.data);
            } catch (err) {
                console.error("❌ Error fetching uploads:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="history-container">
            <h2>📁 Your Uploaded Excel Files</h2>
            {uploads.length === 0 ? (
                <p>No uploads found.</p>
            ) : (
                uploads.map((upload, idx) => (
                    <div key={upload._id} className="upload-block">
                        <h3>Upload #{idx + 1} - {new Date(upload.uploadedAt).toLocaleString()}</h3>
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(upload.data[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {upload.data.map((row, i) => (
                                    <tr key={i}>
                                        {Object.values(row).map((val, j) => (
                                            <td key={j}>{val}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </div>
    );
};

export default UploadHistory;
