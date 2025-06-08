import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../style/Form.css'; // Make sure this includes the CSS you shared
import { FaEnvelope, FaLock } from 'react-icons/fa'; // FontAwesome icons

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await login(form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('email', form.email);
            navigate(res.data.role === 'admin' ? '/admin' : '/dashboard');
        } catch (err) {
            alert(err.response?.data?.error || "Login failed.");
        }
    };

    return (
        <div className="login-page">
            <form className="login-box card" onSubmit={handleSubmit}>

                <h2>Login</h2>
               
                    
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

                <button type="submit">Login</button>

                <p style={{ textAlign: 'center', color: '#aaa', marginTop: '10px' }}>
                    Don't have an account? <Link to="/register" style={{ color: '#5ab1ff' }}>Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
