import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Image, X } from 'lucide-react';
import { mockPosts } from '../data/mockData';

const EditPost = () => {
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [coverImage, setCoverImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const post = mockPosts.find(p => p.id === id);
      
      if (post) {
        reset({
          title: post.title,
          category: post.category,
          content: post.content
        });
        setCoverImage(post.coverImage);
        setError('');
      } else {
        setError('Post not found');
      }
      
      setIsLoading(false);
    }, 500);
  }, [id, reset]);
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Updated post data:', { id, ...data, coverImage });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleImageChange = (e) => {
    setCoverImage('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80');
  };
  
  const removeCoverImage = () => {
    setCoverImage('');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600 dark:text-gray-400">Loading post...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="text-xl text-red-600 dark:text-red-400 mb-4">{error}</div>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Edit Post
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register('title', { 
                required: 'Title is required',
                minLength: {
                  value: 5,
                  message: 'Title must be at least 5 characters'
                }
              })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                errors.title ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter a compelling title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
            )}
          </div>
          
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              id="category"
              {...register('category', { required: 'Category is required' })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                errors.category ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Food">Food</option>
              <option value="Business">Business</option>
              <option value="Photography">Photography</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category.message}</p>
            )}
          </div>
          
          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cover Image
            </label>
            {coverImage ? (
              <div className="relative">
                <img 
                  src={coverImage} 
                  alt="Cover" 
                  className="w-full h-64 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={removeCoverImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  aria-label="Remove cover image"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 flex justify-center">
                <div className="space-y-1 text-center">
                  <Image className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label htmlFor="cover-image" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input 
                        id="cover-image" 
                        name="cover-image" 
                        type="file" 
                        className="sr-only"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content
            </label>
            <textarea
              id="content"
              {...register('content', { 
                required: 'Content is required',
                minLength: {
                  value: 50,
                  message: 'Content must be at least 50 characters'
                }
              })}
              rows={15}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                errors.content ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              }`}
              placeholder="Write your post content here... (Markdown is supported)"
            ></textarea>
            {errors.content && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.content.message}</p>
            )}
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Tip: You can use Markdown formatting for your content.
            </p>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
