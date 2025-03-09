import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogCard from '../components/blog/BlogCard';
import axios from 'axios';

const CategoryPage = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Ensure correct API URL
    const apiUrl = category === 'all'
      ? 'http://localhost:5000/api/posts' // Fetch all posts
      : `http://localhost:5000/api/category/${category}`; // Fetch posts by category

    axios.get(apiUrl)
      .then(response => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("API Error:", error);
        setError("Failed to fetch posts. Please try again.");
        setIsLoading(false);
      });
  }, [category]);

  const categoryTitle = category === 'all' ? 'All Posts' : category?.charAt(0).toUpperCase() + category?.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {categoryTitle}
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-xl text-gray-600 dark:text-gray-400">Loading posts...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-xl text-red-500">{error}</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No posts found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
