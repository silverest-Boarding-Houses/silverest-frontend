// 'use client'

// import React, { useState } from 'react';
// import Image from 'next/image';
// import Logo from '../Images/Logo.jpg';

// export default function Header(){
//     const [isOpen, setIsOpen] = useState(false);
//   const [isCategoriesOpen, setIsCategoriesOpen] = useState(false); // For handling the categories dropdown

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const toggleCategories = () => {
//     setIsCategoriesOpen(!isCategoriesOpen);
//   };
//     {/* Modern Header */}
//     <header className="relative z-10 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-lg shadow-md">
//     {/* Logo */}
//     <div>
//       <Image
//         className="ml-2"
//         alt="logo"
//         src={Logo}
//         width={80}
//         height={80}
//       />
//     </div>

//     {/* Desktop Navigation */}
//     <nav className="hidden md:flex flex-grow justify-center space-x-8 text-white font-semibold">
//       <a href="/Home" className="hover:text-gray-300 transition-all duration-300 text-lg tracking-wider">Home</a>
     
      
//       {/* Categories Dropdown */}
//       <div className="relative group">
//         <a href="#" className="text-lg tracking-wider hover:text-gray-300 transition-all duration-300">Categories</a>
//         <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <ul className="py-2">
//             <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Rentals</a></li>
//             <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">For Sale</a></li>
//             <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Cars</a></li>
//           </ul>
//         </div>
//       </div>
//       <a href="/Properties" className="hover:text-gray-300 transition-all duration-300 text-lg tracking-wider">Hostels</a>
//       <a href="/Agents" className="hover:text-gray-300 transition-all duration-300 text-lg tracking-wider">Agents</a>
//       <a href="/About" className="hover:text-gray-300 transition-all duration-300 text-lg tracking-wider">About Us</a>
//     </nav>

//     {/* Admin Button */}
//     <a
//       href="/Admin/Login"
//       className="hidden md:block rounded-full border border-white px-4 py-2 text-sm text-white shadow-lg hover:bg-white hover:text-black transition-all duration-300"
//     >
//       Admin
//     </a>

//     {/* Hamburger Icon for Mobile */}
//     <div className="md:hidden">
//       <button
//         className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
//         onClick={toggleMenu}
//       >
//         <svg
//           className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           aria-hidden="true"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//         <svg
//           className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           aria-hidden="true"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//         </svg>
//       </button>
//     </div>
//   </header>

//   {/* Mobile Menu */}
//   <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-black/80 p-4 rounded-lg shadow-lg`}>
//     <nav className="space-y-4 text-center text-white">
//       <a href="/Home" className="block py-2 text-lg hover:bg-gray-800 rounded-md">Home</a>
//       <a href="/Properties" className="block py-2 text-lg hover:bg-gray-800 rounded-md">Properties</a>
//       <div className="relative">
//         <button
//           className="block py-2 text-lg w-full text-left hover:bg-gray-800 rounded-md focus:outline-none"
//           onClick={toggleCategories}
//         >
//           Categories
//         </button>
//         {/* Dropdown Menu for Categories */}
//         <div className={`${isCategoriesOpen ? 'block' : 'hidden'} mt-2 bg-white text-black rounded-md shadow-lg`}>
//           <ul className="py-2">
//             <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Rentals</a></li>
//             <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">For Sale</a></li>
//             <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Cars</a></li>
//           </ul>
//         </div>
//       </div>
//       <a href="/Agents" className="block py-2 text-lg hover:bg-gray-800 rounded-md">Agents</a>
//       <a href="/About" className="block py-2 text-lg hover:bg-gray-800 rounded-md">About Us</a>
//       <a
//         href="/Admin/Login"
//         className="block py-2 text-lg rounded-md border border-white px-3 text-center text-white hover:bg-gray-800"
//       >
//         Admin
//       </a>
//     </nav>
//   </div>

// }


