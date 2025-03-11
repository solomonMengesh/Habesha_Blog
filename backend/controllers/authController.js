const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ✅ Register User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user._id);

    res.cookie("authToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });

    res.status(201).json({
      token,
      user: { _id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    console.log('Email received:', email); // Debug log for received email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('No user found with this email:', email); // Debug log if no user is found
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('User found:', user); // Debug log to verify user found

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password); // Use bcrypt.compare directly
    console.log('Password match result:', isMatch); // Debug log for password match result

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = generateToken(user._id); // Use the same generateToken function

    res.json({ token });
    
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

// ✅ Logout User
const logoutUser = (req, res) => {
  res.clearCookie("authToken");
  res.json({ message: "Logged out successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };
