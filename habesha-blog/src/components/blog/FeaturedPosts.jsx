import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';

const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts'); // Replace with your API URL

        setPosts(response.data);
        console.log(response.data)

        setLoading(false);
      } catch (error) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle loading state
  if (loading) return <p>Loading...</p>;

  // Handle error state
  if (error) return <p>{error}</p>;

  // Get the first post as featured
  const featuredPost = posts[0];

  // Get the next 3 posts for the secondary featured section
  const secondaryFeatured = posts.slice(1, 4);

  // Function to format the date to 'Month Day, Year'
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return 'Invalid date';
    return parsedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Posts</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BlogCard post={featuredPost} featured={true} />
          </div>

          <div className="space-y-6">
            {secondaryFeatured.map((post) => (
              <div key={post._id} className="flex items-center space-x-4">
                {/* Post Image */}
                <img 
                  src={`http://localhost:5000/${post.coverImage || '/default-image.jpg'}`} 
                  alt={post.title} 
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div>
                  {/* Post Category */}
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    <a href={`/blog/${post.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                      {post.title}
                    </a>
                  </h3>
                  {/* Post Date */}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(post.createdAt)} {/* Format and display the post date */}
                  </p>
                  {/* Author Name */}
                  {post.user && post.user.username && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      By {post.user.username} {/* Display username */}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
