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
}

interface Admin {
  id: number;
  name: string;
  email: string;
  password:string;
}

export default function AgentManagement() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '' ,password:''});

  // Fetch approved agents
  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await axios.get('http://localhost:3000/agents?status=approved');
        setAgents(response.data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    }
    fetchAgents();
  }, []);

  // Fetch admins
  useEffect(() => {
    async function fetchAdmins() {
      try {
        const response = await axios.get('http://localhost:3000/admins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    }
    fetchAdmins();
  }, []);

  // Handle agent creation
  const handleCreateAdmin = async () => {
    if (!newAdmin.name || !newAdmin.email) {
      alert('Name and email are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/admins', newAdmin);
      if (response.status === 201) {
        setAdmins([...admins, response.data]);
        setNewAdmin({ name: '', email: '',password:'' });
      }
    } catch (error) {
      console.error('Error creating agent', error);
    }
  };

  // Handle admin deletion
  const handleDeleteAdmin = async (id: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this admin?');
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`http://localhost:3000/admins/${id}`);
      if (response.status === 200) {
        setAdmins(admins.filter((admin) => admin.id !== id));
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Silverest Agent Management</h1>
      <br></br>
      <br></br>

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
                </tr>
              ))
            ) : (
                <tr>
                <td colSpan={8} className="text-center p-4">
                  <p className="text-red-500 px-4 py-2">No approved agents found.</p>
                </td>
              </tr>
              
            )}
          </tbody>
        </table>
      </section>

      {/* Admin Management Section */}
      <section>
   
        <br></br>
        <br></br>

     {/* Add Admin Form */}
{/* Add Admin Form */}
<div className="mb-4">
  <h3 className="text-lg font-semibold">Create New Agents Account</h3>
  <div className="flex flex-col space-y-4 mt-4">
    <input
      type="text"
      placeholder="create username"
      className="border p-2 rounded w-full"
      value={newAdmin.name}
      onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
    />
    <input
      type="email"
      placeholder="Email Address"
      className="border p-2 rounded w-full"
      value={newAdmin.email}
      onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
    />
    <input
      type="password"
      placeholder="create Password"
      className="border p-2 rounded w-full"
      onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
    />
    <button
      onClick={handleCreateAdmin}
      className="bg-green-700 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
    >
      Create Account
    </button>
  </div>
</div>

<br></br>
<br></br>

        {/* View Admins */}
        <h3 className="text-lg font-semibold">Current Agents</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">password</th>
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
                  <td className="border p-2">{admin.password}</td>
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
                <td colSpan={8} className="text-center p-4">
                  <p className="text-red-500 px-4 py-2">No  agents found.</p>
                </td>
              </tr>
              
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
