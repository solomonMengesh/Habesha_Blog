const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getSinglePost, updatePost, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// Create Post (Protected Route)
router.post('/', authMiddleware, createPost);

// Get All Posts (Public Route)
router.get('/', getAllPosts);

// Get Single Post (Public Route)
router.get('/:id', getSinglePost);

// Update Post (Protected Route)
router.put('/:id', authMiddleware, updatePost);

// Delete Post (Protected Route)
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
