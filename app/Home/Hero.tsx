"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component from next/image

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-[600px] w-full bg-cover bg-center bg-[url('https://isograft.com/bh/IMG-20220621-WA0036.jpg')]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-lg shadow-md">
        {/* Logo */}
        <div>
          <Link href="/" passHref>
            <Image
              src="https://static.vecteezy.com/system/resources/thumbnails/000/425/085/small_2x/Multimedia__2814_29.jpg"
              alt="Image example"
              width={30}
              height={35}
              className="rounded-full"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-grow justify-center space-x-8 text-white font-semibold">
          <a
            href="/"
            className="hover:text-gray-300 transition-all duration-300 text-lg tracking-wider"
          >
            Home
          </a>
          <a
            href="/Explore"
            className="hover:text-gray-300 transition-all duration-300 text-lg tracking-wider"
          >
            Houses
          </a>
          <a
            href="/About/Agents"
            className="hover:text-gray-300 transition-all duration-300 text-lg tracking-wider"
          >
            Agents
          </a>
          <a
            href="/About"
            className="hover:text-gray-300 transition-all duration-300 text-lg tracking-wider"
          >
            About Us
          </a>
          <a
            href="/Contact"
            className="hover:text-gray-300 transition-all duration-300 text-lg tracking-wider"
          >
            Contact Us
          </a>
        </nav>

        {/* Admin Button (Desktop) */}
        <a
          href="/Admin/Login"
          className="hidden md:block rounded-full border border-white px-4 py-2 text-sm text-white shadow-lg hover:bg-white hover:text-black transition-all duration-300"
        >
          Admin
        </a>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute z-30 top-16 left-0 right-0 bg-black/90 p-4 shadow-lg">
          <nav className="space-y-4 text-center text-white">
            <a
              href="/"
              className="block py-2 text-lg hover:bg-gray-800 rounded-md"
            >
              Home
            </a>
            <a
              href="/Explore"
              className="block py-2 text-lg hover:bg-gray-800 rounded-md"
            >
              Houses
            </a>
            <a
              href="/Agents"
              className="block py-2 text-lg hover:bg-gray-800 rounded-md"
            >
              Agents
            </a>
            <a
              href="/About"
              className="block py-2 text-lg hover:bg-gray-800 rounded-md"
            >
              About Us
            </a>
            <a
              href="/Contact"
              className="block py-2 text-lg hover:bg-gray-800 rounded-md"
            >
              Contact Us
            </a>
          </nav>
        </div>
      )}

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10 text-center text-white px-6">
        <div>
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Find Your Dream Home with Us
          </h1>
          <p className="mt-4 text-lg">
            Explore top agents and find the best properties with us.
          </p>
          <Link href="/Explore">
            <a className="mt-6 inline-block bg-green-500 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-green-600 transition-all duration-300">
              Get Started
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
