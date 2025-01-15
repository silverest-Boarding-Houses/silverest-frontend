"use client";

import { useState, useEffect } from "react";
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
  image: string;
}

interface Booking {
  id: number;
  boardingHouse: BoardingHouse; // Changed from boardingHouseId to full object
  studentName: string;
  emailAddress: string;
  phoneNumber: string;
  bookingDate: string;
  Price: number;
  BookingFee: number;
}

export default function DeleteBookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [boardingHouses, setBoardingHouses] = useState<BoardingHouse[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/bookings");
      console.log("Bookings Data:", response.data); // Check if bookings are fetched correctly
      if (response.data && Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        setErrorMessage("Invalid response format.");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setErrorMessage("Failed to fetch bookings.");
    }
  };

  // Fetch all boarding houses
  const fetchBoardingHouses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/boardinghouses/allhouses");
      console.log("Boarding Houses Data:", response.data); // Check if boarding houses are fetched correctly
      if (response.data && Array.isArray(response.data)) {
        setBoardingHouses(response.data);
      } else {
        setErrorMessage("Failed to fetch boarding houses.");
      }
    } catch (error) {
      console.error("Error fetching boarding houses:", error);
      setErrorMessage("Failed to fetch boarding houses.");
    }
  };

  // Delete booking by ID with confirmation
  const handleDeleteBooking = async (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this booking?");
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`http://localhost:3000/bookings/${id}`);
      if (response.status === 200) {
        setBookings(bookings.filter((booking) => booking.id !== id)); // Remove deleted booking from the list
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      setErrorMessage("Failed to delete booking.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchBookings();
    fetchBoardingHouses();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Delete Bookings</h1>
      <p className="text-1xl font-bold text-center mb-6">(danger zone ⚠️)</p>
      <button
          onClick={fetchBookings}
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-orange-600 transition"
        >
          Refresh Data
        </button>
        <br></br>
        <br></br>

      {/* Error message */}
      {errorMessage && (
        <div className="text-red-500 mt-6 text-center">
          <h2>{errorMessage}</h2>
        </div>
      )}

      {/* Booking List */}
      <div className="space-y-4">
        {bookings.length === 0 ? (
          <div className="text-center">No bookings available.</div>
        ) : (
          bookings.map((booking) => {
            const boardingHouse = booking.boardingHouse; // Directly access the boardingHouse object
            if (!boardingHouse) return null;

            return (
              <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">Booking by: {booking.studentName}</h3>
                  <p><strong>Email:</strong> {booking.emailAddress}</p>
                  <p><strong>Phone:</strong> {booking.phoneNumber}</p>
                  <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
                  <p><strong>Price:</strong> {booking.Price} ZK</p>
                  <p><strong>Booking Fee:</strong> {booking.BookingFee} ZK</p>

                  {/* Boarding House Details */}
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Boarding House Details</h4>
                    <p><strong>House Name:</strong> {boardingHouse.HouseName}</p>
                    <p><strong>Location:</strong> {boardingHouse.Location}</p>
                    <p><strong>Room Type:</strong> {boardingHouse.RoomType}</p>
                    <p><strong>Status:</strong> {boardingHouse.Status}</p>
                    <p><strong>Max People:</strong> {boardingHouse.maxPeople}</p>
                    <img
                      src={boardingHouse.image}
                      alt={boardingHouse.HouseName}
                      style={{ width: "150px", height: "150px" }}
                      className="object-cover rounded-lg mt-2"
                    />
                  </div>
                
                  <button
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                  >
                    Delete Booking
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
