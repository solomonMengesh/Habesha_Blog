import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios'; // Import axios

const RegisterForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
   const password = watch('password');
   const API_URL = process.env.REACT_APP_API_URL;
   
  const onSubmit = async (data) => {
    setIsLoading(true);
    setRegisterError('');

    try {
      // API call for user registration
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      // Assuming the response contains a token
      const { token } = response.data;
      
      // Call the login function from AuthContext
      login(token);

      // Redirect to the dashboard after successful registration
      navigate('/dashboard');
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data) {
        setRegisterError(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setRegisterError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Create your account</h2>

      {registerError && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm">
          {registerError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters'
              }
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.username ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Please enter a valid email address'
              }
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                }
              })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.password ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.confirmPassword ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Agree to Terms Checkbox */}
        <div className="flex items-center">
          <input
            id="agree-terms"
            type="checkbox"
            {...register('agreeTerms', {
              required: 'You must agree to the terms and conditions'
            })}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            I agree to the{' '}
            <a href="/terms" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.agreeTerms && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.agreeTerms.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          {isLoading ? 'Registering...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-300">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
