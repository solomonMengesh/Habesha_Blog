// Get User Profile
const User = require('../models/User'); // Adjust the path if necessary

exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id); // req.user.id comes from JWT middleware
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({
        username: user.username,
        email: user.email,
        _id: user._id
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  


  //Update User Profile

exports.updateUserProfile = async (req, res) => {
    const { username, email } = req.body;
  
    try {
      // Find user and update profile
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.username = username || user.username;
      user.email = email || user.email;
  
      await user.save();
      res.json({
        username: user.username,
        email: user.email,
        _id: user._id
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

 // Delete User
exports.deleteUserProfile = async (req, res) => {
    try {
      // Find and delete the user by ID
      const user = await User.deleteOne({ _id: req.user.id });
      if (user.deletedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  