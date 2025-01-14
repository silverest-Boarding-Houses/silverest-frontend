'use client'
import axios from "axios";
import { useEffect, useState } from "react";

export default function Applicant() {
  const [applicantData, setApplicantData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    ResdencialArea: '',
    professionalBackground: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setApplicantData({
      ...applicantData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    Object.keys(applicantData).forEach((key) => {
      formData.append(key, applicantData[key as keyof typeof applicantData] as string);
    });
    if (selectedFile) {
      formData.append('profileImage', selectedFile);
    }
    try {
      await axios.post('http://localhost:3000/agents', formData);
      alert('Application submitted successfully');
      setApplicantData({
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        ResdencialArea: '',
        professionalBackground: '',
      });
      setSelectedFile(null);
      setImagePreview(null);
      fetchApplicants(); // Refresh the list of applicants
    } catch (error) {
      alert('There was an error submitting your application');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApplicants = async () => {
    try {
      const response = await axios.get('http://localhost:3000/agents');
      setApplicants(response.data);
    } catch (error) {
      setError('Failed to fetch applicants');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/agents/${id}`);
      alert('Applicant deleted successfully');
      fetchApplicants(); // Refresh the list of applicants
    } catch (error) {
      alert('Failed to delete the applicant');
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
      {/* Form Section */}
      <div className="mt-10 bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Apply to Become an Agent
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstname"
              value={applicantData.firstname}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={applicantData.lastname}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={applicantData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phonenumber"
              value={applicantData.phonenumber}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Residential Area</label>
            <input
              type="text"
              name="ResdencialArea"
              value={applicantData.ResdencialArea}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Professional Background</label>
            <textarea
              name="professionalBackground"
              value={applicantData.professionalBackground}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-lg border border-gray-300"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-orange-700"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>

 
    </div>
  );
}
