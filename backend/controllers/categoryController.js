// controllers/categoryController.js
const Post = require('../models/Post');

const getCategoryPostCounts = async (req, res) => {
  try {
    const categories = [
      'technology', 'travel', 'lifestyle', 'photography', 
      'education', 'business', 'health', 'entertainment'
    ];

    const postCounts = {};
    
    // Fetch post count for each category
    for (let category of categories) {
      const count = await Post.countDocuments({ category });
      postCounts[category] = count;
    }

    res.json(postCounts);
  } catch (err) {
    console.error("Error fetching post counts:", err);
    res.status(500).json({ error: "Failed to fetch post counts" });
  }
};

module.exports = {
  getCategoryPostCounts
};
