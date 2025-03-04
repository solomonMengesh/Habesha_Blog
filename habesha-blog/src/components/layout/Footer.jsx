import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Blogify
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              A modern blog platform for sharing your thoughts, ideas, and stories with the world.
              Join our community of writers and readers today!
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Categories
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/category/technology" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/category/lifestyle" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link to="/category/travel" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Travel
                </Link>
              </li>
              <li>
                <Link to="/category/food" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Food
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-base text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Blogify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
