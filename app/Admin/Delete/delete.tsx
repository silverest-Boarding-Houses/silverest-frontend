'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the Property type
interface Property {
  id: string;  // You can also use 'number' if 'id' is numeric
  location: string;
  price: string;
  type: string;
  description: string;
}

export default function DeleteProperty() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3000/explore');
        setProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Handle the deletion of a property
  const handleDelete = async (id: string) => {  // 'id' should be typed as 'string' or 'number'
    try {
      await axios.delete(`http://localhost:3000/explore/${id}`);
      setProperties(properties.filter(property => property.id !== id));
      alert('Property deleted successfully');
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property');
    }
  };

  if (loading) {
    return <div>Loading properties...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Available Properties</h2>
      <div className="flex flex-col space-y-4">
        {properties.map((property) => (
          <div key={property.id} className="flex justify-between items-center p-4 bg-gray-200 rounded shadow">
            <div>
              <h3 className="text-lg font-semibold">{property.location}</h3>
              <p className="text-gray-700">Price: {property.price}</p>
              <p className="text-gray-700">Type: {property.type}</p>
              <p className="text-gray-700">Description: {property.description}</p>
            </div>
            <button
              onClick={() => handleDelete(property.id)}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
