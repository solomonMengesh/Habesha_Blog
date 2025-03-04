import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';

const BlogCard = ({ post, featured = false }) => {
  const timeAgo = formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true });

  if (featured) {
    return (
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02] bg-white dark:bg-gray-800">
        <div className="h-96 relative">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <Link 
              to={`/category/${post.category.toLowerCase()}`}
              className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-indigo-600 rounded-full"
            >
              {post.category}
            </Link>
            <h2 className="text-3xl font-bold mb-2">
              <Link to={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="mb-4 text-gray-200 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-gray-300">{timeAgo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02] bg-white dark:bg-gray-800">
      <Link to={`/blog/${post.slug}`}>
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-5">
        <Link 
          to={`/category/${post.category.toLowerCase()}`}
          className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full"
        >
          {post.category}
        </Link>
        <h2 className="text-xl font-bold mb-2">
          <Link to={`/blog/${post.slug}`} className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{post.author.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</p>
            </div>
          </div>
          <div className="flex space-x-3 text-gray-500 dark:text-gray-400">
            <button className="flex items-center text-xs hover:text-red-500">
              <Heart className="h-4 w-4 mr-1" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center text-xs hover:text-blue-500">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span>{post.comments}</span>
            </button>
            <button className="flex items-center text-xs hover:text-yellow-500">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
