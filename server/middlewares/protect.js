const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      // Optional: Check if admin access expired
      if (req.user.isTemporaryAdmin && req.user.adminAccessExpiresAt) {
        const isExpired = new Date() > new Date(req.user.adminAccessExpiresAt);
        if (isExpired) {
          req.user.role = 'user';
          req.user.isTemporaryAdmin = false;
        }
      }

      next();
    } catch (error) {
      console.error('JWT Error:', error);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;
