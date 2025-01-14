'use client';

import React, { useEffect, useState } from "react";
import { SearchIcon } from '@heroicons/react/outline';

interface Property {
  id: string;
  houseName: string;
  image: string;
  location: string;
  price: string;
  roomType: string;
  bookingFee: string;
  genderCategory: string;
  maxPeople: number;
  status: string;
}

type FilterCriteria = {
  location: string;
  price: string;
  name: string;
  searchBy: 'location' | 'price' | 'name';
};

const Explore = () => {
  const [exploreProps, setExploreProps] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterCriteria>({
    location: '',
    price: '',
    name: '',
    searchBy: 'location',
  });
  const [page, setPage] = useState(1);

  const API_BASE_URL = "http://localhost:3000/boardinghouses";

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

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
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
    } catch (e) {
      setError
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);

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
  if (error) {
    return (
      <div>
        <p className="text-red-500">{error}</p>
        <button onClick={fetchProperties} className="p-2 bg-green-500 text-white rounded">
          Retry
        </button>
      </div>
    );
  }

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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {exploreProps.length > 0 ? (
              exploreProps.map((explore) => (
                <div key={explore.id} className="p-4 border rounded shadow-lg bg-white">
                  <img
                    src={explore.image}
                    alt={`Property ${explore.id}`}
                    className="w-full h-[200px] object-cover mb-4"
                  />
                  <h3 className="text-xl font-bold">{explore.houseName}</h3>
                  <p>{explore.roomType}</p>
                  <p className="text-lg font-semibold">{`Price: ZK${explore.price}`}</p>
                  <p>{`Name: ${explore.houseName}`}</p>
                  <p>{`Booking Fee: ZK${explore.bookingFee}`}</p>
                  <p>{`Gender Category: ${explore.genderCategory}`}</p>
                  <p>{`Max People: ${explore.maxPeople}`}</p>
                  <p className={`font-bold ${explore.status === 'available' ? 'text-green-500' : 'text-red-500'}`}>
                    {explore.status === 'available' ? 'Available' : 'Booked'}
                  </p>
                  <div className="flex justify-center items-center mt-4">
                    <a
                      href={`/property/${explore.id}`}
                      className="block w-32 rounded-md bg-green-700 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-orange-600 transition-all"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">No properties found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
