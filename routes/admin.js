const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // For demo purposes, using hardcoded admin credentials
    // In production, you should store these in a database
    if (username === 'admin' && password === 'admin123') {
      const payload = {
        user: {
          id: 'admin',
          role: 'admin'
        }
      };
      
      jwt.sign(
        payload,
        process.env.JWT_SECRET || 'your_jwt_secret_key',
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get admin profile
router.get('/profile', auth, async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 