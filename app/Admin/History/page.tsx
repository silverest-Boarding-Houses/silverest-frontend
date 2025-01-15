"use client";

import { useState } from "react";
import axios from "axios";

interface BoardingHouse {
  HouseName: string;
  Location: string;
  RoomType: string;
  GenderCategory: string;
  RoomNumber: string;
  Price: number;
  maxPeople: number;
  BookingFee: number;
  LandlordPhoneNumber: string;
  Status: string;
}

interface Booking {
  id: number;
  BookingNumber: string;
  studentName: string;
  emailAddress: string;
  phoneNumber: string;
  bookingDate: string;
  price: number;
  bookingFee: number;
  boardingHouse: BoardingHouse;
}

export default function BookingStoryPage() {
  const [searchDate, setSearchDate] = useState("");
  const [searchBookingNumber, setSearchBookingNumber] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookingsByDate = async () => {
    if (!searchDate) {
      alert("Please select a date to search.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/bookings/byselectedDate",
        { date: searchDate }
      );
      setBookings(response.data || []);
    } catch (error) {
      console.error("Error fetching bookings by date:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingsByNumber = async () => {
    if (!searchBookingNumber) {
      alert("Please enter a booking number to search.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/bookings/number/${searchBookingNumber}`
      );
      setBookings(response.data ? [response.data] : []);
    } catch (error) {
      console.error("Error fetching bookings by number:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Booking History</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search by Date */}
        <div className="flex-1">
          <label className="block text-gray-700 mb-2" htmlFor="searchDate">
            Search by Date:
          </label>
          <input
            type="date"
            id="searchDate"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <button
            onClick={fetchBookingsByDate}
            className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Search by Date
          </button>
        </div>

        {/* Search by Booking Number */}
        <div className="flex-1">
          <label
            className="block text-gray-700 mb-2"
            htmlFor="searchBookingNumber"
          >
            Search by Booking Number:
          </label>
          <input
            type="text"
            id="searchBookingNumber"
            value={searchBookingNumber}
            onChange={(e) => setSearchBookingNumber(e.target.value)}
            placeholder="Enter Booking Number"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <button
            onClick={fetchBookingsByNumber}
            className="mt-2 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Search by Booking Number
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center my-6">
          <p className="text-gray-500">Fetching booking details...</p>
        </div>
      )}

      {/* Booking Results */}
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-4">
              Results for BookingNumber: {booking.BookingNumber}
              </h2>

              {/* Boarding House Details */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-red-800">
                  Boarding House: {booking.boardingHouse.HouseName}
                </h3>
                <p><strong>Location:</strong> {booking.boardingHouse.Location}</p>
                <p><strong>Room Type:</strong> {booking.boardingHouse.RoomType} - {booking.boardingHouse.GenderCategory}</p>
                <p><strong>Room Number:</strong> {booking.boardingHouse.RoomNumber}</p>
                <p><strong>Max People:</strong> {booking.boardingHouse.maxPeople}</p>
                <p><strong>Price:</strong> {booking.boardingHouse.Price} ZK</p>
                <p><strong>Booking Fee:</strong> {booking.boardingHouse.BookingFee} ZK</p>
                <p><strong>Status:</strong> {booking.boardingHouse.Status}</p>
                <p><strong>Landlord Contact:</strong> {booking.boardingHouse.LandlordPhoneNumber}</p>
              </div>

              {/* Student Details */}
              <h3 className="text-lg font-semibold text-red-800 mb-4">Student Details</h3>
              <p><strong>Name:</strong> {booking.studentName}</p>
              <p><strong>Email:</strong> {booking.emailAddress}</p>
              <p><strong>Phone:</strong> {booking.phoneNumber}</p>
              <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p><strong>Total Booking Fee:</strong> {booking.bookingFee} ZK</p>
            </div>
          ))}
        </div>
      ) : !loading && (
        <p className="text-center text-gray-500">No bookings found.</p>
      )}
    </div>
  );
}
