import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <RegisterForm />
    </div>
  );
};

export default Register;
