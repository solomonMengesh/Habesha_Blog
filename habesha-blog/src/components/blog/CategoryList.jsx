import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLaptop, 
  faPlane, 
  faCoffee, 
  faCamera, 
  faBookOpen, 
  faBriefcase, 
  faHeart, 
  faMusic ,
  faCog     
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch the categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories/count/');
        const categoryData = response.data;

        // Map the category data to your categories format
        const mappedCategories = categoryData.map((category) => ({
          name: category.category,
          slug: category.category.toLowerCase(),
          count: category.count,
          icon: getCategoryIcon(category.category),
          color: getCategoryColor(category.category),
        }));

        setCategories(mappedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Function to get the category icon based on the category name
  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case 'Technology':
        return <FontAwesomeIcon icon={faLaptop} className="h-6 w-6" />;
      case 'Travel':
        return <FontAwesomeIcon icon={faPlane} className="h-6 w-6" />;
      case 'Lifestyle':
        return <FontAwesomeIcon icon={faCoffee} className="h-6 w-6" />;
      case 'Photography':
        return <FontAwesomeIcon icon={faCamera} className="h-6 w-6" />;
      case 'Education':
        return <FontAwesomeIcon icon={faBookOpen} className="h-6 w-6" />;
      case 'Business':
        return <FontAwesomeIcon icon={faBriefcase} className="h-6 w-6" />;
      case 'Health':
        return <FontAwesomeIcon icon={faHeart} className="h-6 w-6" />;
      case 'Entertainment':
        return <FontAwesomeIcon icon={faMusic} className="h-6 w-6" />;
        case 'other':
          return <FontAwesomeIcon icon={faCog} className="h-6 w-6" />;

      default:
        return null;
    }
  };

  // Function to get the category color based on the category name
  const getCategoryColor = (categoryName) => {
    switch (categoryName) {
      case 'Technology':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Travel':
        return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'Lifestyle':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Photography':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Education':
        return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      case 'Business':
        return 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'Health':
        return 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400';
      case 'Entertainment':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
        case 'other':
  return 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400';

      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Explore Categories</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.slug}
              to={`/category/${category.slug}`}
              className="flex flex-col items-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-full ${category.color} mb-4`}>
                {category.icon}
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{category.count} posts</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
