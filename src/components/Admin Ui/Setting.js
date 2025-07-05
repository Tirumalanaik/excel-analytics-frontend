import React, { useState } from 'react';


const Settings = () => {
    const [adminName, setAdminName] = useState(localStorage.getItem('adminName') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [password, setPassword] = useState('');

    const handleSave = () => {
        // This is mock; in real apps, send request to backend to update settings
        localStorage.setItem('adminName', adminName);
        alert('✅ Settings saved (mock)');
        setPassword('');
    };

    return (
        <div className="admin-settings">
            <h2>⚙️ Admin Settings</h2>
            <div className="form-group">
                <label>Admin Name</label>
                <input type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Email (read-only)</label>
                <input type="email" value={email} readOnly />
            </div>
            <div className="form-group">
                <label>Change Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" />
            </div>
            <button onClick={handleSave}>💾 Save Changes</button>
        </div>
    );
};

export default Settings;
