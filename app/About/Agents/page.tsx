'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image"; // Use Next.js Image component

// Define the type for the agent
interface Agent {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  ResdencialArea: string;
  professionalBackground: string;
  profileImage: string;
}

const AgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the agents data when the component mounts
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch("http://localhost:3000/agents/all");
        if (!response.ok) {
          throw new Error("Failed to fetch agents");
        }
        const data = await response.json();
        setAgents(data);
        setLoading(false);
      } catch (error: unknown) {  // Explicitly use 'unknown' type for error
        if (error instanceof Error) {  // Type check to ensure proper error handling
          setError("Failed to load agents");
          console.error("Failed to load agents", error.message);
        }
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-green-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">List of Our Available Agents</h1>
      </header>

      {loading ? (
        <div className="text-center text-xl text-gray-500">Loading agents...</div>
      ) : error ? (
        <div className="text-center text-xl text-red-600">{error}</div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <ul className="space-y-6">
            {agents.map((agent) => (
              <li
                key={agent.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100"
              >
                <div className="flex items-center space-x-4 sm:flex-row sm:space-x-6">
                  <Image
                    src={agent.profileImage}
                    alt={`${agent.firstname} ${agent.lastname}`}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700">
                      {agent.firstname} {agent.lastname}
                    </h3>
                    <p className="text-gray-600">Email: {agent.email}</p>
                    <p className="text-gray-500">City: {agent.ResdencialArea}</p>
                    <p className="text-gray-500">
                      Work Background: {agent.professionalBackground}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-orange-700 sm:mt-0 mt-4"
                  onClick={() => window.location.href = `tel:${agent.phonenumber}`}
                >
                  Contact Agent Now
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AgentsPage;
