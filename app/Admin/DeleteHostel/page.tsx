"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Hostel {
  id: number;
  HouseName: string;
  image: string;
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

export default function DeleteHostelPage() {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch all hostels
  const fetchHostels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/boardinghouses/allhouses");

      // Check the response data
      console.log("Hostels Data:", response.data);

      if (response.data && Array.isArray(response.data)) {
        setHostels(response.data);
      } else {
        setErrorMessage("Invalid response format.");
      }
    } catch (error) {
      console.error("Error fetching hostels:", error);
      setErrorMessage("Failed to fetch hostels.");
    }
  };

  // Delete hostel by ID with confirmation
  const handleDeleteHostel = async (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this hostel?");
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`http://localhost:3000/boardinghouses/${id}`);
      if (response.status === 200) {
        setHostels(hostels.filter((hostel) => hostel.id !== id)); // Remove deleted hostel from the list
      }
    } catch (error) {
      console.error("Error deleting hostel:", error);
      setErrorMessage("Failed to delete a boardinghouse because it is associated with a booking. Please delete the booking first.");
    }
  };

  // Fetch all hostels on component mount
  useEffect(() => {
    fetchHostels();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Delete Boarding Houses</h1>
      <p className="text-1xl font-bold text-center mb-6">(danger zone ⚠️)</p>

      {/* Error message */}
      {errorMessage && (
        <div className="text-red-500 mt-6 text-center">
          <h2>{errorMessage}</h2>
        </div>
      )}

      {/* Hostel List */}
      <div className="space-y-4">
        {hostels.length === 0 ? (
          <div className="text-center">No boardingHouses available.</div>
        ) : (
          hostels.map((hostel) => (
            <div key={hostel.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center">
              <img
                src={hostel.image}
                alt={hostel.HouseName}
                style={{ width: '300px', height: '300px' }}
                className="object-cover mb-4 sm:mb-0 sm:mr-4 rounded-lg"
              />
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">{hostel.HouseName}</h3>
                <p><strong>Location:</strong> {hostel.Location}</p>
                <p><strong>Room Type:</strong> {hostel.RoomType}</p>
                <p><strong>Gender Category:</strong> {hostel.GenderCategory}</p>
                <p><strong>Room Number:</strong> {hostel.RoomNumber}</p>
                <p><strong>Price:</strong> {hostel.Price} ZK</p>
                <p><strong>Booking Fee:</strong> {hostel.BookingFee} ZK</p>
                <p><strong>Landlord's Phone:</strong> {hostel.LandlordPhoneNumber}</p>
                <p><strong>Status:</strong> {hostel.Status}</p>
                <p><strong>Max People:</strong> {hostel.maxPeople}</p>
                
                <button
                  onClick={() => handleDeleteHostel(hostel.id)}
                  className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                >
                  Delete Hostel
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
