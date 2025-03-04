import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Heart, MessageCircle, Bookmark, Share2, ChevronLeft } from 'lucide-react';
import { mockPosts } from '../data/mockData';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch post by slug
    setIsLoading(true);
    
    setTimeout(() => {
      const foundPost = mockPosts.find(p => p.slug === slug);
      
      if (foundPost) {
        setPost(foundPost);
        setError('');
      } else {
        setError('Post not found');
      }
      
      setIsLoading(false);
    }, 500);
  }, [slug]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600 dark:text-gray-400">Loading post...</div>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="text-xl text-red-600 dark:text-red-400 mb-4">{error || 'Post not found'}</div>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          Return to home page
        </Link>
      </div>
    );
  }
  
  const timeAgo = formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true });
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to home
        </Link>
        
        {/* Category */}
        <Link 
          to={`/category/${post.category.toLowerCase()}`}
          className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full"
        >
          {post.category}
        </Link>
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {post.title}
        </h1>
        
        {/* Author and date */}
        <div className="flex items-center mb-8">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{post.author.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Published {timeAgo} • {Math.ceil(post.content.length / 1000)} min read
            </p>
          </div>
        </div>
        
        {/* Cover image */}
        <div className="mb-8">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        
        {/* Interaction buttons */}
        <div className="flex items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-8">
          <div className="flex space-x-6">
            <button 
              onClick={() => setLiked(!liked)}
              className={`flex items-center ${
                liked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500'
              }`}
            >
              <Heart className="h-6 w-6 mr-2" fill={liked ? 'currentColor' : 'none'} />
              <span>{liked ? post.likes + 1 : post.likes}</span>
            </button>
            <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500">
              <MessageCircle className="h-6 w-6 mr-2" />
              <span>{post.comments}</span>
            </button>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center ${
                bookmarked ? 'text-yellow-500' : 'text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500'
              }`}
            >
              <Bookmark className="h-6 w-6" fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
            <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-500">
              <Share2 className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Comments section */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Comments ({post.comments})</h3>
          
          {/* Comment form */}
          <div className="mb-8">
            <textarea
              placeholder="Add a comment..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              rows={3}
            ></textarea>
            <div className="mt-2 flex justify-end">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Post Comment
              </button>
            </div>
          </div>
          
          {/* Sample comments */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <div className="flex items-start mb-2">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" 
                  alt="User" 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white mr-2">Michael Brown</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2 days ago</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    This is such an insightful article! I've been thinking about this topic for a while, and you've articulated many points I hadn't considered before.
                  </p>
                  <div className="mt-2 flex items-center space-x-4">
                    <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">Reply</button>
                    <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500">
                      <Heart className="h-4 w-4 inline mr-1" /> 12
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <div className="flex items-start mb-2">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                  alt="User" 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white mr-2">Emily Johnson</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">5 days ago</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    I disagree with some points here. While the article is well-written, I think there are some practical considerations that have been overlooked.
                  </p>
                  <div className="mt-2 flex items-center space-x-4">
                    <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">Reply</button>
                    <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500">
                      <Heart className="h-4 w-4 inline mr-1" /> 8
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
