const express = require('express');
const multer = require('multer');
const path = require('path');
const postController = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Set up multer storage and limits for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Unique filename based on timestamp
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // 10 MB file size limit
});

// POST: Create a new post (with optional cover image)
router.post('/', protect, upload.single('coverImage'), postController.createPost);
// Other routes for GET, PUT, DELETE
router.get('/', postController.getAllPosts);
router.get('/posts/:id', postController.getSinglePost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

module.exports = router;
