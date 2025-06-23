import React from 'react';

const Profile = () => {
    const email = localStorage.getItem('email');
    return (
        <div>
            <h2>Admin Profile</h2>
            <p>Email: {email}</p>
            <p>Role: Admin</p>
        </div>
    );
};

export default Profile;
