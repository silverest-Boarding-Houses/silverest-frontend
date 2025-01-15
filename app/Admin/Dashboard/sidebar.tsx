'use client';

import { useState, useEffect } from 'react';
import { HomeIcon, UsersIcon, CogIcon, LogoutIcon } from '@heroicons/react/outline';
import { FaMoneyBillWave } from 'react-icons/fa';
import axios from 'axios';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    username: 'Loading...',
    email: 'Loading...',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // Default profile image path
    status: 'Active',
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth'); // Replace with your API endpoint
        console.log('API Response:', response.data); // Debugging: Log the API response
        if (response.data && response.data[0]) {
          const userData = response.data[0]; // Assuming only one user in the response array
          setUser({
            username: userData.username || 'No Username',
            email: userData.email || 'No Email',
            profileImage: userData.profileImage || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            status: userData.status || 'Active', // Customize based on your response data if available
          });
        } else {
          console.error('User data is not available in the response');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUser({
          ...user,
          username: 'Error loading username',
          email: 'Error loading email',
        });
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className={`flex h-screen ${isOpen ? 'w-64' : 'w-20'} md:w-64 transition-width duration-300 bg-gray-800 text-white`}>
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        
        {/* Profile Details Box */}
        <div className="p-4 bg-gray-900 border-b border-gray-700">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full mx-auto object-cover"
            />
            <h2 className="mt-4 text-center text-lg font-semibold">{user.username}</h2>
            <p className="text-center text-sm text-gray-400">{user.email}</p>
            <span className="mt-2 inline-block mx-auto px-10 py-1 text-xs bg-green-600 text-white rounded-full text-center">
              {user.status}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-10 space-y-2">
          <a href="/" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
            <HomeIcon className="w-6 h-6" />
            <span className={`ml-2 ${isOpen ? 'block' : 'hidden'} md:block`}>Home</span>
          </a>
          <a href="Admin/AgentManagement" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
            <UsersIcon className="w-6 h-6" />
            <span className={`ml-2 ${isOpen ? 'block' : 'hidden'} md:block`}>Manage Agent</span>
          </a>
          <a href="Admin/AdminManagement" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
            <UsersIcon className="w-6 h-6" />
            <span className={`ml-2 ${isOpen ? 'block' : 'hidden'} md:block`}>Manage Admin</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
            <FaMoneyBillWave className="w-6 h-6" />
            <span className={`ml-2 ${isOpen ? 'block' : 'hidden'} md:block`}>Transactions</span>
          </a>
          <a href="Admin/settings" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
            <CogIcon className="w-6 h-6" />
            <span className={`ml-2 ${isOpen ? 'block' : 'hidden'} md:block`}>Settings</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
            <LogoutIcon className="w-6 h-6" />
            <span className={`ml-2 ${isOpen ? 'block' : 'hidden'} md:block`}>Logout</span>
          </a>
        </nav>
      </div>
      <button onClick={toggleSidebar} className="absolute top-4 left-4 text-gray-400 focus:outline-none md:hidden">
        {isOpen ? '❮' : '❯'}
      </button>
    </div>
  );
};

export default Sidebar;
