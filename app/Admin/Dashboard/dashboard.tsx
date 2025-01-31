'use client';

import React, { useEffect, useState } from "react";
import HomeIcon from '@heroicons/react/solid/HomeIcon';
import TrashIcon from '@heroicons/react/solid/TrashIcon';
import ClipboardListIcon from '@heroicons/react/solid/ClipboardListIcon';
import NewspaperIcon from '@heroicons/react/solid/NewspaperIcon';
import { CalendarIcon, DocumentAddIcon } from "@heroicons/react/solid";

export default function AdminActions() {
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch total amount from API
  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await fetch('http://localhost:3000/bookings/total-bookingfee-today'); // Replace with actual API URL
        const data = await response.json();
        setTotalAmount(data.totalAmount);
      } catch (error) {
        console.error('Error fetching total amount:', error);
      }
    };

    fetchTotalAmount();
  }, []);

  return (
    <div className="bg-gray-400 py-10 min-h-screen flex flex-col items-center">
      {/* Top corner card for total amount */}
      <div className="absolute top-7 right-7 bg-white shadow-lg rounded-lg p-4 w-64">
        <h3 className="text-lg font-semibold text-center mb-2">Total Amount Today</h3>
        <p className="text-2xl font-bold text-green-600 text-center">
          ZK{totalAmount}
        </p>
      </div>
      <br /><br /><br /><br /><br /><br />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4">
        {/* Original cards */}
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <HomeIcon className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Post a House</h3>
          <p className="text-sm text-gray-700 mb-4">
            Easily add new houses you&apos;ve found to your listing by filling out a simple form. The houses will appear in your listing.
          </p>
          <a href="/Admin/Posts">
            <button className="bg-green-700 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition">
              Post House Now
            </button>
          </a>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <ClipboardListIcon className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">View Today&apos;s Booking</h3>
          <p className="text-sm text-gray-700 mb-4">
            View who has booked a house today. This feature gives you real-time bookings for the current day.
          </p>
          <a href="/Admin/Bookings">
            <button className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition">
              View Today&apos;s Booking
            </button>
          </a>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <NewspaperIcon className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Post News</h3>
          <p className="text-sm text-gray-700 mb-4">
            Share the latest news and updates with your audience. Tell them what&apos;s going on, new hostels, new prices, etc.
          </p>
          <a href="/Admin/News">
            <button className="bg-green-700 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition">
              Manage News
            </button>
          </a>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <TrashIcon className="h-12 w-12 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Delete a House</h3>
          <p className="text-sm text-gray-700 mb-4">
            You can remove a house by deleting a particular booking associated with that house first, then remove a house from your listing.
          </p>
          <a href="/Admin/DeleteHostel">
            <button className="bg-red-700 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition">
              Delete House Now
            </button>
          </a>
        </div>

        {/* Additional cards */}
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <HomeIcon className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">View All Houses</h3>
          <p className="text-sm text-gray-700 mb-4">
            In this section, you can view the available houses on your website. You can also search using a house name.
          </p>
          <a href="/Admin/AllHouses">
            <button className="bg-green-700 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition">
              View All Houses Now
            </button>
          </a>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <CalendarIcon className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">View Booking History</h3>
          <p className="text-sm text-gray-700 mb-4">
            Select booking history using a date or search using a booking number to view a particular booking.
          </p>
          <a href="/Admin/History">
            <button className="bg-green-700 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition">
              View Booking History
            </button>
          </a>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <DocumentAddIcon className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Agent Application Forms</h3>
          <p className="text-sm text-gray-700 mb-4">
            New application forms for agents will be found here. Check who wants to be your agent and work together.
          </p>
          <a href="/Admin/Applications">
            <button className="bg-green-700 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition">
              Manage Application Forms
            </button>
          </a>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <ClipboardListIcon className="h-12 w-12 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Delete Booking</h3>
          <p className="text-sm text-gray-700 mb-4">
            Remove a booking from your bookings first in order to delete a house, since a booking relies on the house.
          </p>
          <a href="/Admin/DeleteBooking">
            <button className="bg-red-700 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition">
              Delete Booking Now
            </button>
          </a>
        </div>

      </div>
    </div>
  );
}
