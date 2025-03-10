'use client';

import React, { useEffect, useState } from "react";
import HomeIcon from '@heroicons/react/solid/HomeIcon';
import TrashIcon from '@heroicons/react/solid/TrashIcon';
import ClipboardListIcon from '@heroicons/react/solid/ClipboardListIcon';
import NewspaperIcon from '@heroicons/react/solid/NewspaperIcon';

export default function AdminActions() {
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch total amount from API
  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await fetch('https://silverestbackend-42mz.onrender.com/bookings/total-bookingfee-today'); // Replace with actual API URL
        const data = await response.json();
        setTotalAmount(data.totalAmount);
      } catch (error) {
        console.error('Error fetching total amount:', error);
      }
    };

    fetchTotalAmount();
  }, []);

  return (
    <div className="bg-gray-400 py-10 min-h-screen flex flex-col items-center px-4">
      {/* Top corner card for total amount */}
      <div className="fixed top-5 right-5 bg-white shadow-lg rounded-lg p-4 w-44 sm:w-56 md:w-64 text-center text-sm sm:text-base">
        <h3 className="text-lg font-semibold mb-2">Total Amount Today</h3>
        <p className="text-xl sm:text-2xl font-bold text-green-600">ZK{totalAmount}</p>
      </div>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl mt-20">
        {[{
          icon: HomeIcon,
          title: "Post a House",
          description: "Easily add new houses to your listing by filling out a simple form.",
          link: "/Admin/Posts",
          buttonText: "Post House Now",
          buttonColor: "bg-green-700"
        },
        {
          icon: ClipboardListIcon,
          title: "View Today's Booking",
          description: "View real-time bookings for the current day.",
          link: "/Admin/Bookings",
          buttonText: "View Today’s Booking",
          buttonColor: "bg-green-600"
        },
        {
          icon: NewspaperIcon,
          title: "Post News",
          description: "Share the latest news and updates about new hostels, prices, etc.",
          link: "/Admin/News",
          buttonText: "Manage News",
          buttonColor: "bg-green-700"
        },
        {
          icon: TrashIcon,
          title: "Delete a House",
          description: "Remove a house from your listing after deleting its associated booking.",
          link: "/Admin/DeleteHostel",
          buttonText: "Delete House Now",
          buttonColor: "bg-red-700"
        }].map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4 text-center flex flex-col items-center w-full sm:w-auto max-w-xs">
            <item.icon className="h-10 w-10 sm:h-12 sm:w-12 text-green-600 mb-2" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-xs sm:text-sm text-gray-700 mb-4">{item.description}</p>
            <a href={item.link} className="w-full">
              <button className={`${item.buttonColor} text-white px-3 py-1 w-full sm:w-auto rounded-md hover:bg-orange-600 transition`}>
                {item.buttonText}
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
