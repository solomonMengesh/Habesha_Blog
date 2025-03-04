const Post = require('../models/Post');  
const mongoose = require('mongoose');  
// Create Post
 
exports.createPost = async (req, res) => {
    const { title, content, category } = req.body;
  
    try {
      const newPost = new Post({
        title,
        content,
        category,
        user: req.user.id // Link post to the authenticated user
      });
  
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  // Get All Posts

exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find().populate('user', 'username'); // Populating user field to show username
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  // Get Single Post

exports.getSinglePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('user', 'username');
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  // Update Post


exports.updatePost = async (req, res) => {
    const { title, content, category } = req.body;
  
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      post.title = title || post.title;
      post.content = content || post.content;
      post.category = category || post.category;
  
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  //  Delete Post
  exports.deletePost = async (req, res) => {
    try {
        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid post ID' });
        }

        // Find the post by ID
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Delete the post
        await Post.deleteOne({ _id: req.params.id });

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
