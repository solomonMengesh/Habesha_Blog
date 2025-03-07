import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Image, X } from 'lucide-react';
import axios from 'axios';

const CreatePost = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [coverImage, setCoverImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        alert('Token not found. Please login again.');
        return;
      }

      // Prepare the form data
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('category', data.category);
      formData.append('content', data.content);
      if (coverImage) formData.append('coverImage', coverImage); // Add image if exists

      // Send the POST request to create a new post
      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add token in headers for authorization
          'Content-Type': 'multipart/form-data', // Specify multipart/form-data for file uploads
        },
      });

      console.log('Post created successfully:', response.data);
      navigate('/dashboard'); // Redirect to the dashboard or another page
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again!');
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };
  
  const removeCoverImage = () => {
    setCoverImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Create New Post
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
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${errors.title ? 'border-red-500 dark:border-red-500' : 'border-gray-300'}`}
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
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${errors.category ? 'border-red-500 dark:border-red-500' : 'border-gray-300'}`}
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
                  src={URL.createObjectURL(coverImage)} 
                  alt="Cover" 
                  className="w-full h-64 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={removeCoverImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
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
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${errors.content ? 'border-red-500 dark:border-red-500' : 'border-gray-300'}`}
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
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
