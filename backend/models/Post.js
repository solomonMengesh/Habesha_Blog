const mongoose = require('mongoose');

// Define schema
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user model
    required: true,
  },
}, {
  timestamps: true,
});

// Check if the model is already compiled
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = Post;
