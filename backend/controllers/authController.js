const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

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

    res.cookie("authToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

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
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.cookie("authToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    res.json({
      token,
      user: { _id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Logout User
const logoutUser = (req, res) => {
  res.clearCookie("authToken");
  res.json({ message: "Logged out successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };
