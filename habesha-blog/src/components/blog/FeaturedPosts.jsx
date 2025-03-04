import React from 'react';
import BlogCard from './BlogCard';
import { mockPosts } from '../../data/mockData';

const FeaturedPosts = () => {
  // Get the first post as featured
  const featuredPost = mockPosts[0];
  
  // Get the next 3 posts for the secondary featured section
  const secondaryFeatured = mockPosts.slice(1, 4);

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
              <div key={post.id} className="flex items-center space-x-4">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    <a href={`/blog/${post.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                      {post.title}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
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
