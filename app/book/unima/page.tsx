'use client';

import React, { useEffect, useState } from 'react';

interface Hostel {
  id: string;
  image: string;
  name: string;
  location: string;
  price: string;
  type: string;
}

const HostelListing = () => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHostels = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3000/hostel');
        if (!response.ok) {
          throw new Error('Failed to fetch hostels');
        }
        const data = await response.json();
        setHostels(data);
      } catch (error) {
        setError('Error fetching hostels');
        console.error('Error fetching hostels:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHostels();
  }, []);

  // Render the component
  if (loading) {
    return <div className="text-center">Loading hostels...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Available Hostels</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {hostels.length > 0 ? (
          hostels.map((hostel) => (
            <div key={hostel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={hostel.image}
                alt={hostel.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{hostel.name}</h2>
                <p className="text-gray-600">{hostel.location}</p>
                <p className="text-gray-600">{hostel.price}</p>
                <p className="text-gray-500 text-sm">{hostel.type}</p>
                <a
                  href="#"
                  className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  View Details
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4">No hostels available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default HostelListing;
