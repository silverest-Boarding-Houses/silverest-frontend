'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Agent {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  ResdencialArea: string;
  professionalBackground: string;
  profileImage?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function Applications() {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await axios.get('http://localhost:3000/agents');
        setAgents(response.data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    }

    fetchAgents();
  }, []);

  

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this an agent?");
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`http://localhost:3000/agents/${id}`);
      if (response.status === 200) {
        setAgents(agents.filter((Agent) => Agent.id !== id)); // Remove deleted hostel from the list
      }
    } catch (error) {
      console.error("Error deleting agent:", error);
      setErrorMessage("Failed to delete agent");
    }
  };


  const handleStatusUpdate = async (id: number, status: 'approved' | 'rejected') => {
    try {
      // Update the agent's status
      await axios.patch(`http://localhost:3000/agents/${id}/status`, { status });
  
      // If the status is 'approved', add the agent to the admins list
      if (status === 'approved') {
        const agentToApprove = agents.find((agent) => agent.id === id);
        if (agentToApprove) {
          await axios.post('http://localhost:3000/admins', {
            name: `${agentToApprove.firstname} ${agentToApprove.lastname}`,
            email: agentToApprove.email,
          });
        }
      }
  
      // Update the UI
      setAgents((prevAgents) =>
        prevAgents.map((agent) =>
          agent.id === id ? { ...agent, status } : agent
        )
      );
    } catch (error) {
      console.error('Error updating agent status:', error);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agent Applications</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Profile Image</th>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone Number</th>
            <th className="border p-2">Residential Area</th>
            <th className="border p-2">Background</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {agents.length > 0 ? (
            agents.map((agent) => (
              <tr key={agent.id}>
                <td className="border p-2">{agent.id}</td>
                <td className="border p-2">
                  {agent.profileImage ? (
                    <img
                      src={`http://localhost:3000/uploads/agents/${agent.profileImage}`}
                      alt="Profile"
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className="border p-2">{agent.firstname}</td>
                <td className="border p-2">{agent.lastname}</td>
                <td className="border p-2">{agent.email}</td>
                <td className="border p-2">{agent.phonenumber}</td>
                <td className="border p-2">{agent.ResdencialArea}</td>
                <td className="border p-2">{agent.professionalBackground}</td>
                <td className="border p-2 capitalize">{agent.status}</td>
                <td className="border p-2">
                  {agent.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(agent.id, 'approved')}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(agent.id, 'rejected')}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
                <td><button 
                onClick={() => handleDelete(agent.id)}
                
                className='bg-red-700 text-white px-2 py-1 hover:bg-orange-600'>Delete</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center p-4">
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
function setErrorMessage(arg0: string) {
  throw new Error('Function not implemented.');
}

