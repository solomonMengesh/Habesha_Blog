// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const { createComment, getComments, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createComment);
router.get('/:postId', getComments);
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;
