import React from 'react';
import FeaturedPosts from '../components/blog/FeaturedPosts';
import LatestPosts from '../components/blog/LatestPosts';
import CategoryList from '../components/blog/CategoryList';
import Newsletter from '../components/blog/Newsletter';
// import BlogCard from '../components/common/BlogCard';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Welcome to Blogify
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Discover stories, ideas, and expertise from writers on any topic.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/category/all"
                className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Start Reading
              </a>
              <a
                href="/create-post"
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                Start Writing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <FeaturedPosts />
      
      {/* Category List */}
      <CategoryList />
      
      {/* Latest Posts */}
      <LatestPosts />
      
      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;
