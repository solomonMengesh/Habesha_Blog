import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

const LatestPosts = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the latest posts from the API
    const fetchLatestPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts"); // Replace with actual API
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();

        // Sort posts by createdAt in descending order (most recent first)
        const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Set the latest posts (get the first 6 recent posts)
        setLatestPosts(sortedPosts.slice(0, 6));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Latest Posts
          </h2>
        </div>

        {/* Loading State */}
        {loading && <p className="text-gray-500 dark:text-gray-400">Loading...</p>}

        {/* Error State */}
        {error && <p className="text-red-500 dark:text-red-400">{error}</p>}

        {/* Display the recent posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!loading && !error && latestPosts.length > 0 ? (
            latestPosts.map((post) => <BlogCard key={post.id} post={post} />)
          ) : (
            !loading && !error && (
              <p className="text-gray-500 dark:text-gray-400">
                No latest posts available.
              </p>
            )
          )}
        </div>

        {/* View All Link moved to bottom */}
        <div className="mt-8 text-center">
          <a
            href="/category/all"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
          >
            View all posts
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
