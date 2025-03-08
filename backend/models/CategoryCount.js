const mongoose = require('mongoose');

// Ensure the Post model is not redefined
const Post = mongoose.models.Post || require('./Post');  // Make sure this line isn't overwriting it

const categoryCountSchema = new mongoose.Schema({
  category: { type: String, unique: true, required: true },
  count: { type: Number, default: 0 },
});

module.exports = mongoose.model('CategoryCount', categoryCountSchema);
