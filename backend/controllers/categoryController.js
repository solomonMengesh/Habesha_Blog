// controllers/categoryController.js
const Category = require('../models/Category');

// Create Category
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = new Category({ name });
    await category.save();
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(400).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(400).json({ message: 'Category not found' });

    await category.remove();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
