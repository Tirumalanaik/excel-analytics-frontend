// src/pages/Register.jsx
import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../style/Register.css'; // Updated stylesheet
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.error || 'Registration failed.');
        }
    };

    return (
        <div className="register-page">
            <form className="register-box card" onSubmit={handleSubmit}>

                <h2>Sign Up</h2>

                <div className="input-group">
                    <span className="icon"><FaUser /></span>
                    <input
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <span className="icon"><FaEnvelope /></span>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <span className="icon"><FaLock /></span>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <span className="icon"><FaUser /></span>
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button type="submit">Register</button>

                <p className="switch-auth">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
