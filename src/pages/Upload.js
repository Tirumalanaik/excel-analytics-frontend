
import React, { useState, useRef } from 'react';

import axios from 'axios';
import * as XLSX from 'xlsx';
import '../style/Upload.css';
import { FaUpload } from 'react-icons/fa';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [excelData, setExcelData] = useState([]);
    const fileInputRef = useRef(null);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                setExcelData(json); // ✅ preview data
            };
            reader.readAsArrayBuffer(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setUploadStatus('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            setUploadStatus(res.data.message || 'File uploaded successfully.');

            // ✅ Clear state and input after success
            setFile(null);
            setExcelData([]);
            fileInputRef.current.value = '';
        } catch (err) {
            console.error(err);
            setUploadStatus('Upload failed. Please try again.');
        }
    };


    return (
        <div className="upload-page">
            <h2>Upload Excel File</h2>
            <p>Upload your Excel file (.xls or .xlsx) to analyze and visualize your data</p>

            <div className="upload-box">
                <label htmlFor="fileInput" className="upload-label">
                    <FaUpload size={40} color="#007bff" />
                    <strong>Upload Excel File</strong>
                    <p>Drag and drop your file here, or click to browse</p>
                    <small>Supports .xlsx and .xls files</small>
                </label>
                <input
                    id="fileInput"
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />
                {file && (
                    <p className="file-name">Selected File: <strong>{file.name}</strong></p>
                )}
            </div>

            <button className="upload-btn" onClick={handleUpload}>Upload</button>
            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}

            {/* ✅ Preview section */}
            {excelData.length > 0 && (
                <div className="preview-table">
                    <h3>Preview</h3>
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(excelData[0]).map((key, idx) => (
                                    <th key={idx}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {excelData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Object.values(row).map((value, colIndex) => (
                                        <td key={colIndex}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Upload;
