import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error('Error fetching categories:', err));
    }, []);

    return (
        <section className="py-10 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Explore Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <Link key={category.slug} to={`/category/${category.slug}`} className="flex flex-col items-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-medium text-gray-900 dark:text-white mb-1">{category.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{category.postCount} posts</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryList;
