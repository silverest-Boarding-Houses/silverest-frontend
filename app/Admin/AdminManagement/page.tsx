'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for Toastify


interface Admin {
  id: number;
  username: string;
  email: string;
  password: string;
}

export default function AgentManagement() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdmin, setNewAdmin] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);

  // Fetch admins from the API
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/auth');
      setAdmins(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

 // Handle admin creation
const handleCreateAdmin = async () => {
    if (!newAdmin.username || !newAdmin.email || !newAdmin.password) {
      toast.warn('All fields are required.', { position: "top-right" });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/auth/register', newAdmin);
      if (response.status === 201) {
        setAdmins((prevAdmins) => [...prevAdmins, response.data]);
        setNewAdmin({ username: '', email: '', password: '' });
        toast.success('Admin created successfully!', { position: "top-right" });
      }
    } catch (error) {
      console.error('Error creating admin', error);
      toast.error('Failed to create admin.', { position: "top-right" });
    }
  };
  
  // Handle admin deletion
  const handleDeleteAdmin = async (id: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this admin?');
    if (!isConfirmed) return;
  
    try {
      const response = await axios.delete(`http://localhost:3000/auth/${id}`);
      if (response.status === 200) {
        setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
        toast.success('Admin deleted successfully!', { position: "top-right" });
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast.error('Failed to delete admin.', { position: "top-right" });
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <ToastContainer /> {/* Add this line */}
      <h1 className="text-2xl font-bold mb-4">Silverest Admin Management</h1>
  
      {/* Add Admin Form */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Create New Admin Account</h3>
        <div className="flex flex-col space-y-4 mt-4">
          <input
            type="text"
            placeholder="Create username"
            className="border p-2 rounded w-full"
            value={newAdmin.username}
            onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
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
            placeholder="Create Password"
            className="border p-2 rounded w-full"
            value={newAdmin.password}
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
  
      {/* Admin List */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Current Admins</h3>
        <button
          onClick={fetchAdmins}
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-orange-600 transition mb-4"
        >
          Refresh Data
        </button>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((admin) => (
                <tr key={admin.id}>
                  <td className="border p-2">{admin.id}</td>
                  <td className="border p-2">{admin.username}</td>
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
                <td colSpan={4} className="text-center p-4">
                  <p className="text-red-500">No admins found.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}  