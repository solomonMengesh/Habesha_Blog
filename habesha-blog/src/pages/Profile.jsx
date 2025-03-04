import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, Image } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      bio: 'I am a passionate writer and blogger who loves to share ideas and stories with the world.'
    }
  });
  
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const newPassword = watch('newPassword');
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send the data to your backend
      console.log('Profile data:', { ...data, avatar });
      
      // Show success message or notification
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAvatarChange = (e) => {
    // In a real app, this would upload the image to your server or cloud storage
    // For this demo, we'll just use a placeholder image
    setAvatar('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Your Profile
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'password'
                  ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Change Password
            </button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    <img 
                      src={avatar} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <label htmlFor="avatar" className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full cursor-pointer hover:bg-indigo-700">
                      <Image className="h-4 w-4" />
                      <input 
                        id="avatar" 
                        type="file" 
                        className="sr-only"
                        onChange={handleAvatarChange}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Picture</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      JPG, GIF or PNG. Max size of 800K
                    </p>
                    <button
                      type="button"
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                
                {/* Username */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      {...register('username', { 
                        required: 'Username is required',
                        minLength: {
                          value: 3,
                          message: 'Username must be at least 3 characters'
                        }
                      })}
                      className={`w-full pl-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.username ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username.message}</p>
                  )}
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: 'Please enter a valid email address'
                        }
                      })}
                      className={`w-full pl-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                  )}
                </div>
                
                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    {...register('bio')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Tell us about yourself"
                  ></textarea>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Brief description for your profile. URLs are hyperlinked.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'password' && (
              <div className="space-y-6">
                {/* Current Password */}
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="currentPassword"
                      type="password"
                      {...register('currentPassword', { required: 'Current password is required' })}
                      className={`w-full pl-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.currentPassword ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.currentPassword.message}</p>
                  )}
                </div>
                
                {/* New Password */}
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="newPassword"
                      type="password"
                      {...register('newPassword', { required: 'New password is required' })}
                      className={`w-full pl-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.newPassword ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.newPassword.message}</p>
                  )}
                </div>
                
                {/* Confirm New Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      {...register('confirmPassword', {
                        validate: value =>
                          value === newPassword || 'Passwords do not match'
                      })}
                      className={`w-full pl-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.confirmPassword ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                className={`inline-flex justify-center items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                  isSubmitting ? 'bg-gray-600' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
