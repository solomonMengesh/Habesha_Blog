const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Post = require('../models/Post');

// Get all categories with post count
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();

        // Count posts in each category
        const categoriesWithPostCount = await Promise.all(categories.map(async (category) => {
            const postCount = await Post.countDocuments({ category: category._id });
            return { ...category.toObject(), postCount };
        }));

        res.json(categoriesWithPostCount);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
