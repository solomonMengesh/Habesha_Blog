const Post = require('../models/Post'); // Make sure the path is correct

// Create a new post with an optional cover image
exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const userId = req.user._id;
    const coverImage = req.file ? req.file.path : null;

    // Create a new post
    const newPost = new Post({
      title,
      content,
      category,
      coverImage: req.file ? req.file.path : null, // Store the file path if a cover image is uploaded
      user: userId, // Link the post to the user
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create post', error: err.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    // Fetch all posts and populate the 'user' field with 'username'
    const posts = await Post.find().populate('user', 'username');
    res.json(posts); // Send posts as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' }); // Handle any errors that occur
  }
}

// Get a single post
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

// Update a post
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

// Delete a post
exports.deletePost = async (req, res) => {
  try {
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
