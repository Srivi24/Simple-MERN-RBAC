import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import './Register.css';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminSecretKey: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { data } = await API.post('/auth/register-admin', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        adminSecretKey: formData.adminSecretKey,
      });

      localStorage.setItem('token', data.token);
      navigate('/admin-dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Admin registration failed');
    }
  };

  return (
    <>
        <div className="register-container">
        <div className="register-box">
            <h2>Admin Registration</h2>
            <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
            ⚠️ Requires Admin Secret Key
            </p>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                />
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label>Admin Secret Key</label>
                <input
                type="password"
                name="adminSecretKey"
                value={formData.adminSecretKey}
                onChange={handleChange}
                required
                placeholder="Enter admin secret key"
                />
            </div>
            <button type="submit" className="btn-primary">
                Register as Admin
            </button>
            </form>
            <p className="login-link">
            <a href="/register">Register as regular user</a> | <a href="/login">Login</a>
            </p>
        </div>
        <div className='advice-box'>
            <h1>You can use<br /> the text within <br /> the quotes<br /> as Admin Secret Key <br /> for <span style={{color:'white'}}>trial purpose</span> <br /> - <br />
            "<span style={{color:'white'}}>super-secret-admin</span>"</h1>
        </div>
        </div>
    </>
  );
};

export default AdminRegister;