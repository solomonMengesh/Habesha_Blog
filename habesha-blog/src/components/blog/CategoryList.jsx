import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Laptop, 
  Plane, 
  Coffee, 
  Camera, 
  BookOpen, 
  Briefcase, 
  Heart, 
  Music 
} from 'lucide-react';

const categories = [
  { 
    name: 'Technology', 
    slug: 'technology', 
    count: 42, 
    icon: <Laptop className="h-6 w-6" />,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
  },
  { 
    name: 'Travel', 
    slug: 'travel', 
    count: 35, 
    icon: <Plane className="h-6 w-6" />,
    color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
  },
  { 
    name: 'Lifestyle', 
    slug: 'lifestyle', 
    count: 28, 
    icon: <Coffee className="h-6 w-6" />,
    color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
  },
  { 
    name: 'Photography', 
    slug: 'photography', 
    count: 21, 
    icon: <Camera className="h-6 w-6" />,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
  },
  { 
    name: 'Education', 
    slug: 'education', 
    count: 19, 
    icon: <BookOpen className="h-6 w-6" />,
    color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
  },
  { 
    name: 'Business', 
    slug: 'business', 
    count: 16, 
    icon: <Briefcase className="h-6 w-6" />,
    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
  },
  { 
    name: 'Health', 
    slug: 'health', 
    count: 14, 
    icon: <Heart className="h-6 w-6" />,
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400'
  },
  { 
    name: 'Entertainment', 
    slug: 'entertainment', 
    count: 12, 
    icon: <Music className="h-6 w-6" />,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
  },
];

const CategoryList = () => {
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
