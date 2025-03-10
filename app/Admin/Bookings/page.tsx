"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface BoardingHouse {
  id: number;
  HouseName: string;
  Location: string;
  RoomType: string;
  GenderCategory: string;
  RoomNumber: string;
  Price: string;
  BookingFee: string;
  LandlordPhoneNumber: string;
  Status: string;
  maxPeople: number;
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

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookingData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://silverestbackend-42mz.onrender.com/bookings/todayBookings");
      console.log("API Response:", response.data); // Debugging
      setBookings(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading booking details...</p>
      </div>
    );
  }

  if (!Array.isArray(bookings) || bookings.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">No bookings found for today.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Todays Booking Details</h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={fetchBookingData}
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-orange-600 transition"
        >
          Refresh Data
        </button>
      </div>
      <ul className="space-y-6">
        {bookings.map((booking, index) => (
          <li
            key={booking.id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-red-800">
              
              {index + 1}    .Boarding house : {booking.boardingHouse.HouseName}
              </h2>
              <span className="text-sm text-red-600">
                Booking Number: {booking.BookingNumber}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-600">
                  <strong>Location:</strong> {booking.boardingHouse.Location}
                </p>
                <p className="text-gray-600">
                  <strong>Room Type:</strong> {booking.boardingHouse.RoomType} -{" "}
                  {booking.boardingHouse.GenderCategory}
                </p>
                <p className="text-gray-600">
                  <strong>Room Number:</strong> {booking.boardingHouse.RoomNumber}
                </p>
                <p className="text-gray-600">
                  <strong>Max People:</strong> {booking.boardingHouse.maxPeople}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <strong>Price:</strong> {booking.boardingHouse.Price} ZK
                </p>
                <p className="text-gray-600">
                  <strong>Booking Fee:</strong> {booking.boardingHouse.BookingFee} ZK
                </p>
                <p className="text-gray-600">
                  <strong>Status:</strong> {booking.boardingHouse.Status}
                </p>
                <p className="text-gray-600">
                  <strong>Landlord Contact:</strong>{" "}
                  {booking.boardingHouse.LandlordPhoneNumber}
                </p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-4">Student Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <p className="text-gray-600">
                <strong>Name:</strong> {booking.studentName}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> {booking.emailAddress}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {booking.phoneNumber}
              </p>
              <p className="text-gray-600">
                <strong>Booking Date:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleString()}
              </p>
              <p className="text-gray-600">
                <strong>Total Booking Fee:</strong> {booking.bookingFee} ZK
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
