import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../style/Form.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(form);

            // Store credentials
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('email', form.email);

            // ✅ Set token globally for axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

            // Navigate based on role
            navigate(res.data.role === 'admin' ? '/admin' : '/dashboard');
        } catch (err) {
            alert(err.response?.data?.error || 'Login failed.');
        }
    };


    return (
        <div className="login-page">
            <div className="login-info">
                <h1>Secure. Fast. Beautiful.</h1>
                <p>Login to access powerful data analytics tools designed for decision makers. Visualize, analyze, and grow smarter every day.</p>
                <img src="https://via.placeholder.com/500x300?text=Your+Analytics+Preview" alt="Preview" />
            </div>

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

                <div className="divider">or</div>
                <div className="oauth-buttons">
                   <a href="http://localhost:5000/auth/github" className="github-btn">
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
    alt="GitHub"
  />
  GitHub
</a>


                    <a className="oauth-btn google-btn" href="http://localhost:5000/auth/google">
                        <img
                            src="https://developers.google.com/identity/images/g-logo.png"
                            alt="Google icon"
                        />

                        Google
                    </a>
                </div>


                <p>
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
