import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, Image } from 'lucide-react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, dispatch } = useAuth(); // Use the correct hook from AuthContext
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  
  // Added activeTab state for switching between Profile and Password tabs
  const [activeTab, setActiveTab] = useState('profile');

  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProfilePic(URL.createObjectURL(selectedFile));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Please fill in all required fields");
      return;
    }
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
  
    // If a new profile picture is selected, handle the upload
    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("name", filename);
      data.append("file", file);
  
      try {
        // Post the image to the backend for uploading
        const uploadResponse = await axios.post("http://localhost:5000/api/uploads", data); 
        
        // After the upload, use the returned URL for the profile picture
        updatedUser.profilePic = uploadResponse.data.fileUrl;  // Assuming your backend sends back the file URL
      } catch (err) {
        console.error("File upload error:", err);
        setError("Error uploading profile picture");
        return;
      }
    }
  
    try {
      const token = localStorage.getItem("authToken");
    
      console.log("Authorization Header:", {
        Authorization: `Bearer ${token}`,
      });
      console.log("Updated User Data:", updatedUser);
      if (!token) {
        setError("No authentication token found. Please log in.");
        console.error("Token not found in localStorage");
        return;
      }
      console.log("Retrieved token:", token);
      // Use the correct route for updating the profile
      await axios.put("http://localhost:5000/api/users/profile", updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,  // Add auth token
        },
      });
    
      
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      setError("Error updating profile");
      console.error("Error updating profile:", err.response ? err.response.data : err.message);
    }
  };
  
  const handleRemoveAvatar = () => {
    setProfilePic(null); // Reset to default avatar
    setFile(null); // Clear selected file
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Your Profile
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-4 text-sm font-medium ${activeTab === 'profile' ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`px-4 py-4 text-sm font-medium ${activeTab === 'password' ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Change Password
            </button>
          </div>

          <form onSubmit={onSubmit} className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    <img
                      src={file ? URL.createObjectURL(file) : user.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : 'http://localhost:5000/uploads/default-image.jpg'}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <label
                      htmlFor="avatar"
                      className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full cursor-pointer hover:bg-indigo-700"
                    >
                      <Image className="h-4 w-4" />
                      <input
                        id="avatar"
                        type="file"
                        className="sr-only"
                        onChange={handleAvatarChange}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Picture</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">JPG, GIF or PNG. Max size of 800K</p>
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Save Changes
              </button>
              {success && (
                <div className="text-sm text-green-600 dark:text-green-400">{success}</div>
              )}
              {error && (
                <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
