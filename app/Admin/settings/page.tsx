'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SettingsPage = () => {
  const [user, setUser] = useState({
    id: '',
    username: '',
    email: '',
    password: '',
    newPassword: '',
    profileImage: '',
  });

  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth'); // Fetch user data
        if (response.data && response.data.length > 0) {
          const userData = response.data[0]; // Assuming you want the first user in the array
          setUser({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            password: '',
            newPassword: '',
            profileImage: userData.profileImage || '',
          });
        } else {
          toast.error('No user data found');
        }
      } catch (error) {
        toast.error('Error fetching user profile');
        console.error('Error fetching user profile:', error);
      } finally {
        setIsFetching(false); // Ensure this is set to false after data is fetched
      }
    };
    fetchUserProfile();
  }, []);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle image file selection
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
      setImageFile(file); // Save the file for upload
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user.id) {
      toast.error('User ID is missing');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('username', user.username);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('newPassword', user.newPassword);

      // Update user details
      await axios.put(`http://localhost:3000/auth/${user.id}`, formData);

      // Upload profile image if selected
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('profileImage', imageFile);

        await axios.post(
          `http://localhost:3000/auth/${user.id}/uploadProfileImage`,
          imageFormData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      }

      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return <div className="text-center py-10">Loading user profile...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <h1 className="text-3xl font-semibold text-center text-gray-800">Profile Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {/* User Information Section */}
        <section>
          <h2 className="text-xl font-medium text-gray-700">User Information</h2>
          <div className="mt-4 space-y-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
        </section>

        {/* Password Update Section */}
        <section>
          <h2 className="text-xl font-medium text-gray-700">Change Password</h2>
          <div className="mt-4 space-y-4">
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-gray-600">
                Current Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="newPassword" className="text-sm font-medium text-gray-600">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                value={user.newPassword}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
        </section>

        {/* Profile Picture Section */}
        <section>
          <h2 className="text-xl font-medium text-gray-700">Profile Picture</h2>
          <div className="mt-4">
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium hover:file:bg-gray-100 focus:outline-none"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-green-700 text-white font-semibold rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300"
          >
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
