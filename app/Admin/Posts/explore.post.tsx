'use client';

import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Posts = () => {
  const [houseName, setHouseName] = useState('');
  const [image, setImage] = useState('');
  const [roomType, setRoomType] = useState('');
  const [Location, setLocation] = useState('');
  const [genderCategory, setGenderCategory] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [price, setPrice] = useState('');
  const [maxPeople, setMaxPeople] = useState('');
  const [bookingFee, setBookingFee] = useState('');
  const [landlordPhoneNumber, setLandlordPhoneNumber] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://silverestbackend-42mz.onrender.com/boardinghouses/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          HouseName: houseName,
          image,
          RoomType: roomType,
          Location,
          GenderCategory: genderCategory,
          RoomNumber: roomNumber,
          Price: parseFloat(price),
          maxPeople: parseInt(maxPeople, 10),
          BookingFee: parseFloat(bookingFee),
          LandlordPhoneNumber: landlordPhoneNumber,
          Status: status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post property');
      }

      toast.success('Property posted successfully!');
      setHouseName('');
      setImage('');
      setRoomType('');
      setLocation('');
      setGenderCategory('');
      setRoomNumber('');
      setPrice('');
      setMaxPeople('');
      setBookingFee('');
      setLandlordPhoneNumber('');
      setStatus('');
    } catch {
      toast.error('Error posting property. Please try again.');
    }
  };

  return (
    <div className="h-full w-full bg-gray-200 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Post a New House</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-6">
          <div className="mb-4">
            <label htmlFor="houseName" className="block text-gray-700">House Name</label>
            <input
              id="houseName"
              type="text"
              value={houseName}
              onChange={(e) => setHouseName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">Image URL</label>
            <input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Location" className="block text-gray-700">Location</label>
            <input
              id="Location"
              type="text"
              value={Location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="roomType" className="block text-gray-700">Room Type</label>
            <select
              id="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Room Type</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="genderCategory" className="block text-gray-700">Gender Category</label>
            <select
              id="genderCategory"
              value={genderCategory}
              onChange={(e) => setGenderCategory(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="roomNumber" className="block text-gray-700">Room Number</label>
            <input
              id="roomNumber"
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">Price</label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="maxPeople" className="block text-gray-700">Max People</label>
            <select
              id="maxPeople"
              value={maxPeople}
              onChange={(e) => setMaxPeople(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select</option>
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="bookingFee" className="block text-gray-700">Booking Fee</label>
            <input
              id="bookingFee"
              type="number"
              value={bookingFee}
              onChange={(e) => setBookingFee(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="landlordPhoneNumber" className="block text-gray-700">Landlord Phone Number</label>
            <input
              id="landlordPhoneNumber"
              type="text"
              value={landlordPhoneNumber}
              onChange={(e) => setLandlordPhoneNumber(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Post a House
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Posts;
