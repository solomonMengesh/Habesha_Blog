import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogPost from './pages/BlogPost';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import CategoryPage from './pages/CategoryPage';
import Contact from './pages/ContactPage';  // Import Contact page
import About from './pages/AboutPage';      // Import About page

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/about" element={<About />} /> {/* Added About Page */}
                <Route path="/contact" element={<Contact />} /> {/* Added Contact Page */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/create-post" 
                  element={
                    <ProtectedRoute>
                      <CreatePost />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/edit-post/:id" 
                  element={
                    <ProtectedRoute>
                      <EditPost />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
