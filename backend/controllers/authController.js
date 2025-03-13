const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// ✅ Generate JWT Token
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

    // ✅ Ensure password is properly hashed before saving
    console.log("Raw Password Before Hashing:", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user._id);

    // ✅ Set HttpOnly cookie
    res.cookie("authToken", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict" 
    });

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
    console.log('Email received:', email);
    console.log('Entered password:', password);

    const user = await User.findOne({ email });

    if (!user) {
      console.log('No user found with this email:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('User found:', user);
    console.log('Stored Hashed Password:', user.password);

    // ✅ Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    // ✅ Set HttpOnly cookie
    res.cookie("authToken", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict" 
    });

    res.json({ token, user: { _id: user._id, username: user.username, email: user.email } });

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
