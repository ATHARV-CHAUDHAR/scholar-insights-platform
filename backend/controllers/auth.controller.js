
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { dbConnection } = require('../config/db.config');

// Login controller
const login = (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  // Check if user exists
  dbConnection.query(
    `SELECT u.user_id, u.username, u.email, u.password_hash, r.role_name as role
     FROM Users u
     JOIN Assoc_User_Roles ur ON u.user_id = ur.user_id
     JOIN Roles r ON ur.role_id = r.role_id
     WHERE u.email = ? AND u.is_active = true
     LIMIT 1`,
    [email],
    async (error, results) => {
      if (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error during login' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = results[0];
      
      // For demo purpose, accept any password (as your frontend does)
      // In production, use proper password verification:
      // const isMatch = await bcrypt.compare(password, user.password_hash);
      // if (!isMatch) {
      //   return res.status(401).json({ message: 'Invalid credentials' });
      // }
      
      // Create JWT token
      const token = jwt.sign(
        {
          id: user.user_id,
          name: user.username,
          email: user.email,
          role: user.role.toLowerCase()
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      // Set the token in the response
      res.json({
        token,
        user: {
          id: user.user_id,
          name: user.username,
          email: user.email,
          role: user.role.toLowerCase()
        }
      });
    }
  );
};

// Get current user
const getCurrentUser = (req, res) => {
  const userId = req.user.id;

  dbConnection.query(
    `SELECT u.user_id, u.username, u.email, r.role_name as role
     FROM Users u
     JOIN Assoc_User_Roles ur ON u.user_id = ur.user_id
     JOIN Roles r ON ur.role_id = r.role_id
     WHERE u.user_id = ? AND u.is_active = true
     LIMIT 1`,
    [userId],
    (error, results) => {
      if (error) {
        console.error('Get user error:', error);
        return res.status(500).json({ message: 'Server error fetching user data' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];
      res.json({
        user: {
          id: user.user_id,
          name: user.username,
          email: user.email,
          role: user.role.toLowerCase()
        }
      });
    }
  );
};

// Logout controller - simple since JWT is stateless
const logout = (req, res) => {
  // For full logout, client should delete the token
  res.json({ message: 'Logged out successfully' });
};

module.exports = {
  login,
  getCurrentUser,
  logout
};
