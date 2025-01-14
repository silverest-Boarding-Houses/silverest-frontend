"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface BookingItem {
  BookingNumber: string;
  studentName: string;
  emailAddress: string;
  phoneNumber: string;
  bookingDate: string;
  price: number;
  bookingFee: number;
  boardingHouse: {
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
  };
}

export default function BookingPage() {
  const [bookingData, setBookingData] = useState<BookingItem | null>(null);

  useEffect(() => {
    async function fetchBookingData() {
      try {
        const response = await axios.get("http://localhost:3000/bookings/todayBookings"); // Adjust endpoint accordingly
        setBookingData(response.data);1
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    }

    fetchBookingData();
  }, []);

  if (!bookingData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading booking details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Booking Details</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Boarding House: {bookingData.boardingHouse.HouseName}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-gray-600">
              <strong>Location:</strong> {bookingData.boardingHouse.Location}
            </p>
            <p className="text-gray-600">
              <strong>Room Type:</strong> {bookingData.boardingHouse.RoomType} -{" "}
              {bookingData.boardingHouse.GenderCategory}
            </p>
            <p className="text-gray-600">
              <strong>Room Number:</strong> {bookingData.boardingHouse.RoomNumber}
            </p>
            <p className="text-gray-600">
              <strong>Max People:</strong> {bookingData.boardingHouse.maxPeople}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <strong>Price:</strong> {bookingData.boardingHouse.Price} USD
            </p>
            <p className="text-gray-600">
              <strong>Booking Fee:</strong> {bookingData.boardingHouse.BookingFee} USD
            </p>
            <p className="text-gray-600">
              <strong>Status:</strong> {bookingData.boardingHouse.Status}
            </p>
            <p className="text-gray-600">
              <strong>Landlord Contact:</strong>{" "}
              {bookingData.boardingHouse.LandlordPhoneNumber}
            </p>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Student Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <p className="text-gray-600">
            <strong>Name:</strong> {bookingData.studentName}
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> {bookingData.emailAddress}
          </p>
          <p className="text-gray-600">
            <strong>Phone:</strong> {bookingData.phoneNumber}
          </p>
          <p className="text-gray-600">
            <strong>Booking Number:</strong> {bookingData.BookingNumber}
          </p>
          <p className="text-gray-600">
            <strong>Booking Date:</strong>{" "}
            {new Date(bookingData.bookingDate).toLocaleString()}
          </p>
          <p className="text-gray-600">
            <strong>Total Price:</strong> {bookingData.price} USD
          </p>
        </div>
      </div>
    </div>
  );
}
