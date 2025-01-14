'use client'

import { useState } from 'react';
import { HomeIcon, UsersIcon, CogIcon, LogoutIcon } from '@heroicons/react/outline';
import { FaMoneyBillWave } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex h-screen ${isOpen ? 'w-64' : 'w-20'} md:w-64 transition-width duration-300 bg-gray-800 text-white`}>
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between px-4 py-4 bg-gray-900 md:hidden">
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
          <button onClick={toggleSidebar} className="text-gray-400 focus:outline-none">
            {isOpen ? '❮' : '❯'}
          </button>
        </div>
        <nav className="mt-10 space-y-2">
          <a href="/" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
            <HomeIcon className="w-6 h-6" />
            <span className={`ml-2 ${isOpen ? 'block' : 'hidden'} md:block`}>Home</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
            <UsersIcon className="w-6 h-6" />
            <span className={`ml-2 ${isOpen ? 'block' : 'hidden'} md:block`}>Manage Admins</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
            <UsersIcon className="w-6 h-6" />
            <span className={`ml-2 ${isOpen ? 'block' : 'hidden'} md:block`}>Manage Agents</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
            <FaMoneyBillWave className="w-6 h-6" />
            <span className={`ml-2 ${isOpen ? 'block' : 'hidden'} md:block`}>Transactions</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
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
