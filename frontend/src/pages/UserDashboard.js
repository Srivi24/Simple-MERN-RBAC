import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h2>User Portal</h2>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </nav>
      <div className="dashboard-content">
        <div className="welcome-card">
          <h1>Welcome, {user?.name}! 👋</h1>
          <p className="user-role">Role: {user?.role}</p>
          <p className="user-email">Email: {user?.email}</p>
        </div>

        <div className="cards-grid">
          <div className="info-card">
            <h3>📊 My Profile</h3>
            <p>View and manage your personal information</p>
          </div>
          <div className="info-card">
            <h3>⚙️ Settings</h3>
            <p>Update your preferences and account settings</p>
          </div>
          <div className="info-card">
            <h3>📝 My Tasks</h3>
            <p>View your assigned tasks and projects</p>
          </div>
          <div className="info-card">
            <h3>📞 Support</h3>
            <p>Get help and contact support team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;