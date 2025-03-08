const express = require('express');
const CategoryCount = require('../models/CategoryCount');

const router = express.Router();

// Get category post counts
router.get('/count', async (req, res) => {
  try {
    const counts = await CategoryCount.find({});
    res.json(counts);
  } catch (error) {
    console.error("Error fetching category counts:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
