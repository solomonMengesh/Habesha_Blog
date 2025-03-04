import React from 'react';
import Layout from '../components/layout/Layout';
import { users } from '../data/mockData';

const AboutPage = () => {
  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-indigo-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">About Blogify</h1>
              <p className="text-xl">
                A modern platform for writers and readers to connect through engaging content.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                At Blogify, we believe in the power of words to inspire, educate, and connect people from all walks of life. Our mission is to create a platform where writers can share their knowledge and stories, and readers can discover content that resonates with them.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                We're committed to fostering a community of thoughtful discourse, creative expression, and continuous learning. Whether you're a seasoned writer or just starting out, Blogify provides the tools and audience to help your voice be heard.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">What Makes Us Different</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">User-Friendly Platform</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our intuitive interface makes it easy for writers to create and publish content, and for readers to discover and engage with it.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Community Focus</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We prioritize building a supportive community where writers can receive feedback and connect with their audience.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quality Content</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We promote thoughtful, well-crafted content that adds value to readers' lives and contributes to meaningful conversations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {users.map(user => (
                <div key={user.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{user.name}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 mb-4">
                      {user.isAdmin ? 'Founder & CEO' : 'Content Strategist'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {user.bio || 'Passionate about creating a platform that empowers writers and readers alike.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                These core principles guide everything we do at Blogify.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Authenticity</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We value genuine voices and perspectives, encouraging writers to share their unique insights and experiences.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Inclusivity</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We're committed to creating a platform where diverse voices are welcomed and celebrated.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quality</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We strive for excellence in both our platform and the content we promote, setting high standards for ourselves and our community.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Innovation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We're constantly looking for ways to improve and evolve, embracing new ideas and technologies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
              <p className="text-xl mb-8">
                Whether you're here to write, read, or both, we're excited to have you as part of our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/register" 
                  className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
                >
                  Create Account
                </a>
                <a 
                  href="/contact" 
                  className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
