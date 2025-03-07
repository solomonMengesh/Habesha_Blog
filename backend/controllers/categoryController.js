// controllers/categoryController.js

const getCategories = (req, res) => {
  const categories = [
    { name: 'Technology', slug: 'technology', count: 42, icon: 'Laptop', color: 'bg-blue-100 text-blue-600' },
    { name: 'Travel', slug: 'travel', count: 35, icon: 'Plane', color: 'bg-green-100 text-green-600' },
    // Add more categories here...
  ];
  
  res.json(categories);
};

module.exports = { getCategories };
