import axios from 'axios';

// Use environment variable for deployed API base URL, fallback to localhost for development.
// REACT_APP_API_URL will be set in the deployment configuration (e.g., Netlify/Vercel).
const baseURL = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL 
  : 'http://localhost:5000/api';

const API = axios.create({
  baseURL: baseURL,
});

// Add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;