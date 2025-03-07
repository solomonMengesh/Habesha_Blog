const Post = require('../models/Post'); // Assuming you have a Post model for MongoDB
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // File name with timestamp
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

// Middleware to check authorization
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from the header
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user; // Attach user to the request object
    next();
  });
};

// Create a new post
exports.createPost = [
  authenticateJWT,
  upload.single('coverImage'), // Handle the file upload
  async (req, res) => {
    const { title, category, content } = req.body;
    const userId = req.user.id; // Get the user ID from the JWT payload
    const coverImage = req.file ? req.file.path : null; // Save image path or null if no file uploaded

    try {
      // Create a new post object
      const newPost = new Post({
        title,
        category,
        content,
        coverImage,
        user: userId, // Link the post with the user who created it
      });

      // Save the post to the database
      const savedPost = await newPost.save();
      res.status(201).json(savedPost); // Respond with the created post
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Error creating post. Please try again later.' });
    }
  }
];


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
