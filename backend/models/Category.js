const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
});

module.exports = mongoose.model('Category', CategorySchema);
