import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Sun, Moon, Menu, X, Search, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Blogify</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 border-b-2 border-transparent hover:border-indigo-500">
                Home
              </Link>
              <Link to="/category/technology" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:border-indigo-500 hover:text-gray-700 dark:hover:text-gray-300">
                Technology
              </Link>
              <Link to="/category/lifestyle" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:border-indigo-500 hover:text-gray-700 dark:hover:text-gray-300">
                Lifestyle
              </Link>
              <Link to="/category/travel" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:border-indigo-500 hover:text-gray-700 dark:hover:text-gray-300">
                Travel
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:ml-4 md:flex md:items-center md:space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none"
                  >
                    <User className="h-5 w-5" />
                    <span>{user?.username}</span>
                  </button>
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div className="flex items-center">
                          <LogOut className="h-4 w-4 mr-2" />
                          <span>Sign out</span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 dark:text-gray-100 border-l-4 border-indigo-500"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/category/technology"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-indigo-300 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={toggleMenu}
            >
              Technology
            </Link>
            <Link
              to="/category/lifestyle"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-indigo-300 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={toggleMenu}
            >
              Lifestyle
            </Link>
            <Link
              to="/category/travel"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-indigo-300 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={toggleMenu}
            >
              Travel
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
              <div className="ml-3">
                {isAuthenticated ? (
                  <>
                    <div className="text-base font-medium text-gray-800 dark:text-gray-200">{user?.username}</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user?.email}</div>
                  </>
                ) : (
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Guest</div>
                )}
              </div>
            </div>
            <div className="mt-3 space-y-1">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={toggleMenu}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={toggleMenu}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
