"use client"

import React, { useState } from 'react';
import Image from 'next/image';

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  return (
    <div className="relative h-[600px] w-full bg-cover bg-center bg-[url('https://isograft.com/bh/IMG-20220621-WA0036.jpg')]">
      <div className="absolute inset-0 bg-black/70"></div>

      <header className="relative z-10 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-lg shadow-md">
        <div>
          {/* Logo */}
        </div>

        <nav className="hidden md:flex flex-grow justify-center space-x-8 text-white font-semibold">
          <a href="/Home" className="hover:text-gray-300 transition-all duration-300 text-lg tracking-wider">Home</a>
          <a href="/Explore" className="hover:text-gray-300 transition-all duration-300 text-lg tracking-wider">Houses</a>
          <a href="/Agents" className="hover:text-gray-300 transition-all duration-300 text-lg tracking-wider">Agents</a>
          <a href="/About" className="hover:text-gray-300 transition-all duration-300 text-lg tracking-wider">About Us</a>
          <a href="/About" className="hover:text-gray-300 transition-all duration-300 text-lg tracking-wider">Contact Us</a>
        </nav>

        <a
          href="/Admin/Login"
          className="hidden md:block rounded-full border border-white px-4 py-2 text-sm text-white shadow-lg hover:bg-white hover:text-black transition-all duration-300"
        >
          Admin
        </a>

        <div className="md:hidden">
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={toggleMenu}
          >
            <svg
              className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </header>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-black/80 p-4 rounded-lg shadow-lg`}>
        <nav className="space-y-4 text-center text-white">
          <a href="/Home" className="block py-2 text-lg hover:bg-gray-800 rounded-md">Home</a>
          <a href="/Properties" className="block py-2 text-lg hover:bg-gray-800 rounded-md">Houses</a>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={toggleCategories}
              className="w-full py-2 text-lg text-white bg-transparent hover:bg-gray-800 rounded-md"
            >
              Categories
            </button>
            {isCategoriesOpen && (
              <div className="absolute right-0 mt-2 bg-black/90 text-white rounded-md w-48 shadow-lg">
                <a href="/Category1" className="block px-4 py-2 hover:bg-gray-700">Category 1</a>
                <a href="/Category2" className="block px-4 py-2 hover:bg-gray-700">Category 2</a>
                <a href="/Category3" className="block px-4 py-2 hover:bg-gray-700">Category 3</a>
              </div>
            )}
          </div>

          <a href="/Agents" className="block py-2 text-lg hover:bg-gray-800 rounded-md">Agents</a>
          <a href="/About" className="block py-2 text-lg hover:bg-gray-800 rounded-md">About Us</a>
          <a
            href="/Admin/Login"
            className="block py-2 text-lg rounded-md border border-white px-3 text-center text-white hover:bg-gray-800"
          >
            Admin
          </a>
        </nav>
      </div>

      <div className="relative z-10 text-center mt-16">
        <h1 className="text-white text-5xl font-bold">
          Silverest Boarding Houses<br />
          <span className="mt-4 block">Accommodation</span>
        </h1>
        <p className="text-white text-lg mt-4">
          Discover the perfect off-campus accommodation that suits your needs and lifestyle.
        </p>

        <div className="mt-8 flex justify-center space-x-4">
          <a
            href="/Explore"
            className="inline-block w-40 py-3 bg-green-700 text-white font-semibold rounded-md hover:bg-orange-600 transition-all"
          >
            Explore Houses
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
