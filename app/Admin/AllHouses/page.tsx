"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface House {
  HouseName: string;
  image: string;
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

export default function AvailableHouses() {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHouses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/boardinghouses/allhouses");
      setHouses(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching house data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading available houses...</p>
      </div>
    );
  }

  if (!Array.isArray(houses) || houses.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">No houses available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Available Houses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses.map((house, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={house.image}
              alt={house.HouseName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {house.HouseName}
              </h2>
              <p className="text-gray-600">
                <strong>Location:</strong> {house.Location}
              </p>
           
              <p className="text-gray-600">
                <strong>Room Type:</strong> {house.RoomType}
              </p>
              <p className="text-gray-600">
                <strong>Gender:</strong> {house.GenderCategory}
              </p>
              <p className="text-gray-600">
                <strong>Price:</strong> ZK{house.Price} 
              </p>
              <p className="text-gray-600">
                <strong>Booking Fee:</strong> ZK{house.BookingFee}
              </p>
              <p className="text-gray-600">
                <strong>Max People:</strong> {house.maxPeople}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong> {house.Status}
              </p>
              <button
                className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-orange-600 transition w-full"
                onClick={() => alert(`Contact Landlord: ${house.LandlordPhoneNumber}`)}
              >
                Contact Landlord
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
