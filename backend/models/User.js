const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, default: "" },
  password: { type: String, required: true },
  profilePic: {
    type: String, // Store URL of the profile picture
    default: "",  // Default is empty (can be updated later)
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});


module.exports = mongoose.model('User', userSchema);
