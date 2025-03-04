import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-bold text-indigo-600 dark:text-indigo-400">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        <Home className="h-5 w-5 mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
