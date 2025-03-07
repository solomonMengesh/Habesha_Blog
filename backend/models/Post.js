const mongoose = require('mongoose');

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

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
