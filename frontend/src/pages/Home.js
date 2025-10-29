import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        <h2 className="logo">Simple Mern application based on User & Admin roles</h2>
        <div className="nav-links">
          {user ? ( 
            <Link
              to={user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'}
              className="btn-nav"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn-nav">
                Login
              </Link>
              <Link to="/register" className="btn-nav-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="hero-section">
        <h1 className="hero-title">
          Role-Based Access Control
          <br />
          <span className="gradient-text">Made Simple</span>
        </h1>
        <p className="hero-subtitle">
          Secure authentication system with role-based access control
          <br />
          Built with MERN Stack
        </p>
        <button onClick={handleGetStarted} className="btn-hero">
          Get Started →
        </button>

        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Secure Authentication</h3>
            <p>JWT-based authentication with bcrypt password hashing</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Role Management</h3>
            <p>Admin and User roles with different access levels</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast & Responsive</h3>
            <p>Built with React and optimized for performance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;