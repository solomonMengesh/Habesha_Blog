// controllers/commentController.js
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Create Comment
exports.createComment = async (req, res) => {
    const { postId, content } = req.body;
  
    // Check if userId is attached from middleware
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ message: "User ID is missing from request" });
    }
  
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(400).json({ message: "Post not found" });
      }
  
      const comment = new Comment({
        postId,
        userId: req.user.userId, // Ensure this is correctly set
        content
      });
  
      console.log("Saving comment:", comment); // Debugging log
  
      const savedComment = await comment.save();
  
      res.status(201).json({ message: "Comment created successfully", comment: savedComment });
    } catch (error) {
      console.error("Error saving comment:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// Get Comments for a Post
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(400).json({ message: 'Comment not found' });

    await comment.remove();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
