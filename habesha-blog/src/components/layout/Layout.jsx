import React from 'react';


const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;
