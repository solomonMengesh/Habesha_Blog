import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Reset error if any
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setEmail('');
    }, 500);
  };

  return (
    <section className="py-16 bg-indigo-600 dark:bg-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Subscribe to our Newsletter</h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
            Get the latest posts delivered right to your inbox. We promise not to spam you or share your email.
          </p>
          
          {isSubmitted ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-green-600 dark:text-green-400 font-medium text-lg mb-2">Thank you for subscribing!</div>
              <p className="text-gray-600 dark:text-gray-300">
                We've sent a confirmation email to your inbox. Please check your email to complete the subscription process.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className={`w-full px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 ${
                      error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-indigo-300'
                    }`}
                  />
                  {error && (
                    <p className="absolute -bottom-6 left-0 text-red-200 text-sm">{error}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-r-lg font-medium flex items-center"
                >
                  Subscribe
                  <Send className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
