import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [profile, setProfile] = useState({});
    const [form, setForm] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [pwdForm, setPwdForm] = useState({ currentPassword: '', newPassword: '' });

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        axios.get('/api/profile', { headers })
            .then(res => {
                setProfile(res.data);
                setForm({
                    name: res.data.name || '',
                    email: res.data.email || '',
                    phone: res.data.phone || '',
                    profilePic: res.data.profilePic || ''
                });
            })
            .catch(err => {
                console.error('Error fetching profile:', err);
                alert('Failed to load profile');
            });
    }, []);

    const handleFormChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = e => {
        setForm(prev => ({ ...prev, profilePic: e.target.files[0] }));
    };

    const saveProfile = async e => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.entries(form).forEach(([k, v]) => data.append(k, v));
            const res = await axios.put('/api/profile', data, { headers });
            setProfile(res.data);
            setEditMode(false);
            alert('Profile updated!');
        } catch (err) {
            console.error('Error updating profile:', err);
            alert('Failed to update profile');
        }
    };

    const handlePasswordChange = async e => {
        e.preventDefault();
        try {
            await axios.put('/api/profile/password', pwdForm, { headers });
            alert('Password updated successfully!');
            setPwdForm({ currentPassword: '', newPassword: '' });
        } catch (err) {
            console.error('Error changing password:', err);
            alert('Failed to change password');
        }
    };

    const toggle2FA = async () => {
        const endpoint = profile.twoFA?.enabled ? 'disable' : 'enable';
        try {
            const res = await axios.post(`/api/profile/2fa/${endpoint}`, {}, { headers });
            if (endpoint === 'enable') {
                setQrCode(res.data.qrData);
                alert('Scan the QR code using your Authenticator app.');
            } else {
                setProfile(prev => ({ ...prev, twoFA: { enabled: false } }));
                alert('2FA disabled.');
            }
        } catch (err) {
            console.error('Error toggling 2FA:', err);
            alert('Failed to update 2FA settings');
        }
    };

    return (
        <div className="profile-container">
            <h2>My Profile</h2>

            {editMode ? (
                <form onSubmit={saveProfile} encType="multipart/form-data">
                    <input type="text" name="name" value={form.name} onChange={handleFormChange} placeholder="Name" required />
                    <input type="email" name="email" value={form.email} onChange={handleFormChange} placeholder="Email" required />
                    <input type="text" name="phone" value={form.phone} onChange={handleFormChange} placeholder="Phone" />
                    <input type="file" name="profilePic" accept="image/*" onChange={handleFileChange} />
                    <button type="submit">💾 Save</button>
                    <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                </form>
            ) : (
                <>
                        {profile.profilePic && (
                            <img src={`http://localhost:5000${profile.profilePic}`} width="120" alt="Profile" />
                        )}

                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone}</p>
                    <p><strong>2FA:</strong> {profile.twoFA?.enabled ? '✅ Enabled' : '❌ Disabled'}</p>
                    <button onClick={() => setEditMode(true)}>✏️ Edit Profile</button>
                </>
            )}

            <hr />

            <h3>🔒 Change Password</h3>
            <form onSubmit={handlePasswordChange}>
                <input
                    type="password"
                    name="currentPassword"
                    value={pwdForm.currentPassword}
                    onChange={e => setPwdForm({ ...pwdForm, currentPassword: e.target.value })}
                    placeholder="Current Password"
                    required
                />
                <input
                    type="password"
                    name="newPassword"
                    value={pwdForm.newPassword}
                    onChange={e => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                    placeholder="New Password"
                    required
                />
                <button type="submit">Update Password</button>
            </form>

            <hr />

            <h3>🔐 Two-Factor Authentication (2FA)</h3>
            <button onClick={toggle2FA}>
                {profile.twoFA?.enabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
            {qrCode && (
                <>
                    <p>Scan this QR code:</p>
                    <img src={qrCode} alt="QR Code for 2FA" />
                </>
            )}
        </div>
    );
}

export default Profile;
