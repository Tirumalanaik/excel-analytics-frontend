import React from 'react';
import '../../style/FileTable.css';

const FileTable = ({ files }) => {
    return (
        <div className="admin-table-container">
            <h3 className="admin-table-title">Uploaded Files</h3>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Uploaded By</th>
                        <th>Upload Date</th>
                    </tr>
                </thead>
                <tbody>
                    {files?.length > 0 ? (
                        files.map((file) => (
                            <tr key={file._id}>
                                <td>{file.originalname}</td>
                                <td>{file.email}</td>
                                <td>{new Date(file.createdAt).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No files found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FileTable;
