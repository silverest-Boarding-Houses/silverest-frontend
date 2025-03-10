'use client'
import React, { useState, useEffect, useCallback } from "react";
import { SearchIcon } from '@heroicons/react/outline';
import Image from 'next/image'; 

interface Property {
  id: string;
  HouseName: string;
  image: string;
  Location: string;
  Price: number;
  RoomNumber: number;
  RoomType: string;
  BookingFee: number;
  GenderCategory: string;
  maxPeople: number;
  Status: string;
}

type FilterCriteria = {
  location: string;
  price: number;
  name: string;
  searchBy: 'location' | 'price' | 'name';
};

const Explore = () => {
  const [exploreProps, setExploreProps] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);  // Error state

  const [filters, setFilters] = useState<FilterCriteria>({
    location: '',
    price: 0,
    name: '',
    searchBy: 'location',
  });

  const API_BASE_URL = "https://silverestbackend-42mz.onrender.com/boardinghouses";

  const getPlaceholder = (): string => {
    switch (filters.searchBy) {
      case 'location':
        return 'e.g., 1km away from the campus';
      case 'price':
        return 'e.g., 2000';
      case 'name':
        return 'e.g., Silver Villa';
      default:
        return 'Search...';
    }
  };

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    let url = `${API_BASE_URL}/allhouses`;

    try {
      if (filters.searchBy === 'location' && filters.location) {
        url = `${API_BASE_URL}/search-Location?location=${filters.location}`;
      } else if (filters.searchBy === 'price' && filters.price) {
        url = `${API_BASE_URL}/search-price/${filters.price}`;
      } else if (filters.searchBy === 'name' && filters.name) {
        url = `${API_BASE_URL}/search-name?name=${filters.name}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch properties.');
      const data = await response.json();
      setExploreProps(data);
    } catch (error) {
      setError("Failed to load properties. Please try again later.");
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProperties();
  }, [filters, fetchProperties]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchBy: e.target.value as 'location' | 'price' | 'name',
    }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="h-full w-full bg-green-600">
      <div className="p-8">
        <p className="text-4xl text-center mb-6 text-white">
          Explore Various Houses Available at Silverest Boarding Houses
        </p>

        <div className="mt-16">
          <div className="flex justify-center mb-6 space-x-4">
            <select
              name="searchBy"
              value={filters.searchBy}
              onChange={handleSearchByChange}
              className="p-2 border rounded"
            >
              <option value="location">Location</option>
              <option value="price">Price</option>
              <option value="name">House Name</option>
            </select>

            <input
              type="text"
              name={filters.searchBy}
              placeholder={getPlaceholder()}
              value={filters[filters.searchBy]}
              onChange={handleFilterChange}
              className="w-[300px] p-2 border rounded"
            />

            <button
              onClick={fetchProperties}
              className="p-2 bg-green-500 text-white rounded"
            >
              <SearchIcon className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Error message handling */}
          {error && <p className="text-red-600 text-center">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {exploreProps.length > 0 ? (
              exploreProps.map((explore) => (
                <div key={explore.id} className="p-4 border rounded shadow-lg bg-white">
                  <Image
                    src={explore.image}
                    alt={`Property ${explore.id}`}
                    width={500} // Set appropriate width
                    height={200} // Set appropriate height
                    className="w-full h-[200px] object-cover mb-4"
                  />
                  <h3 className="text-xl font-bold">{explore.HouseName}</h3>
                  <br />
                  <p>
                    <span className="text-black font-bold">RoomType: </span>
                    {explore.RoomType}
                  </p>
                  <p className="text-lg ">
                    <span className="text-black font-bold">Price: </span>
                    ZK {explore.Price}
                  </p>
                  <p>
                    <span className="text-black font-bold">RoomNumber: </span>
                    {explore.RoomNumber}
                  </p>
                  <p>
                    <span className="text-black font-bold">Booking Fee: </span>
                    <span className="text-red-600 font-bold" >  ZK {explore.BookingFee}</span>
                  </p>
                  <p>
                    <span className="text-black font-bold">Gender Category: </span>
                    {explore.GenderCategory}
                  </p>
                  <p>
                    <span className="text-black font-bold">Max People: </span>
                    {explore.maxPeople}
                  </p>
                  <p>
                    <span className="text-black font-bold">Location: </span>
                    {explore.Location}
                  </p>

                  <p>
                    <span className="text-black font-bold">Status: </span>
                    <span className={`${explore.Status?.toLowerCase() === 'available' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}`}>
                      {explore.Status}
                    </span>
                  </p>

                  <div className="flex justify-center items-center mt-4">
                  <div className="flex justify-center items-center mt-4">
  <a
    href={`https://wa.me/265996222889?text=${encodeURIComponent(
      `Hello, I'm interested in booking the following room:\n\n🏡 House Name: ${explore.HouseName}\n🛏️ Room Type: ${explore.RoomType}\n💰 Booking Fee: ZK ${explore.BookingFee}\n📍 Location: ${explore.Location}`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="block w-32 rounded-md bg-green-700 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-orange-600 transition-all"
  >
    Book Now
  </a>
</div>

                  </div>
                </div>
              ))
            ) : (
              
              <p className="text-red">No boardinghouses found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
