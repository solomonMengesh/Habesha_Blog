// In authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Log the decoded token to check its contents
      console.log('Decoded Token:', decoded);

      // Use 'userId' instead of 'id' from the decoded token
      req.user = await User.findById(decoded.userId).select('-password');

      // Log the user to see if it is found
      console.log('User from DB:', req.user);

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next(); // Continue to the next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};


module.exports = protect;
