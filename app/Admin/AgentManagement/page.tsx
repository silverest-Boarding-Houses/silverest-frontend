'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for Toastify
import Image from 'next/image'; // Import Image for optimization

interface Agent {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  ResdencialArea: string;
  professionalBackground: string;
  profileImage?: string;
}

interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
}

export default function AgentManagement() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' });

  // Fetch Approved Agents
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/agents?status=approved');
        setAgents(response.data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };
    fetchAgents();
  }, []);

  // Fetch Admins
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching agent:', error);
        toast.error("Error fetching agents", { position: 'top-right' });
      }
    };
    fetchAdmins();
  }, []);

  // Create Admin
  const handleCreateAdmin = async () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      toast.warn("All fields are required", { position: 'top-right' });
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/admins', newAdmin);
      if (response.status === 201) {
        setAdmins((prevAdmins) => [...prevAdmins, response.data]);
        setNewAdmin({ name: '', email: '', password: '' });
        toast.success('Agent created successfully!', { position: "top-right" });
      }
    } catch (error) {
      toast.error("Failed to create agent", { position: "top-right" });
      console.error('Error creating admin:', error);
    }
  };

  // Delete Admin
  const handleDeleteAdmin = async (id: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this agent?');
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`http://localhost:3000/admins/${id}`);
      if (response.status === 200) {
        setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
        toast.success('Agent deleted successfully!', { position: "top-right" });
      }
    } catch (error) {
      console.error('Error deleting agent:', error);
      toast.error("Failed to delete agent", { position: "top-right" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer /> {/* Add ToastContainer here for toast notifications */}
      <h1 className="text-2xl font-bold mb-4">Silverest Agent Management</h1>

      {/* Approved Agents Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">Approved Agents</h2>
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
            </tr>
          </thead>
          <tbody>
            {agents.length > 0 ? (
              agents.map((agent) => (
                <tr key={agent.id}>
                  <td className="border p-2">{agent.id}</td>
                  <td className="border p-2">
                    {agent.profileImage ? (
                      <Image
                        src={`http://localhost:3000/uploads/agents/${agent.profileImage}`}
                        alt="Profile"
                        width={64} // Set width
                        height={64} // Set height
                        className="object-cover rounded-full"
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-4 text-red-500">No approved agents found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <br></br>

      <br></br>

      {/* Admin Management Section */}
      <section>

        {/* Add Admin Form */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Create New Agent Account</h3>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 rounded w-full"
              value={newAdmin.name}
              onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded w-full"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded w-full"
              value={newAdmin.password}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
            />
            <button
              onClick={handleCreateAdmin}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
            >
              Create Account
            </button>
          </div>
        </div>

        <br></br>

        <br></br>

        {/* View Admins */}
        <h3 className="text-lg font-semibold mb-2">Current Agents</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((admin) => (
                <tr key={admin.id}>
                  <td className="border p-2">{admin.id}</td>
                  <td className="border p-2">{admin.name}</td>
                  <td className="border p-2">{admin.email}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-red-500">No agents found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
