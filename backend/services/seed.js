const mongoose = require('mongoose');
const Post = require('./models/Post');
require('dotenv').config();

const categories = ['technology', 'travel', 'lifestyle', 'photography', 'education', 'business', 'health', 'entertainment'];

const seedPosts = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Clear existing posts
  await Post.deleteMany({});

  // Add sample posts
  const posts = categories.map((category) => ({
    title: `Sample Post in ${category}`,
    content: `This is a sample post in the ${category} category.`,
    category,
  }));

  await Post.insertMany(posts);
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedPosts().catch((err) => console.error('Seeding error:', err));