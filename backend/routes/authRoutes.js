const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getMe,
  registerAdmin  // <-- Add this
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/register-admin', registerAdmin);  // <-- Add this
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;