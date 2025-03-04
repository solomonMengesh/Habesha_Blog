// routes/userRoutes.js (or similar)
const express = require('express');
const { getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');  // Assuming you have JWT middleware

const router = express.Router();

// Use authMiddleware to protect these routes
router.get('/profile', authMiddleware, getUserProfile);   // GET /api/users/profile
router.put('/profile', authMiddleware, updateUserProfile);  // PUT /api/users/profile
router.delete('/profile', authMiddleware, deleteUserProfile);  // DELETE /api/users/profile

module.exports = router;
