// models/Category.js

const mongoose = require('mongoose');

// Define the category schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  count: { type: Number, default: 0 },
  icon: { type: String, required: true },
  color: { type: String, required: true },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
