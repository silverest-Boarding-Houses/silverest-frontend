'use client';
import React, { useEffect, useState } from "react";

const News = () => {
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch existing news
  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:3000/news');
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      setNews(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Handle form submission to post news
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/news/postnews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image,
          content,
          date,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post news');
      }

      setSuccess('News posted successfully!');
      setImage('');
      setContent('');
      setDate('');
      fetchNews(); // Refresh the news list after posting
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Handle deleting news
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/news/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete news');
      }

      setSuccess('News deleted successfully!');
      fetchNews(); // Refresh the news list after deletion
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Post News</h2>

        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Header Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter image URL"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter content"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-orange-600 transition duration-150"
            >
              Post News
            </button>
          </div>
        </form>
      </div>

      {/* News List */}
      <div className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">News List</h2>
        {news.length > 0 ? (
          <ul className="space-y-4">
            {news.map((item: any) => (
              <li key={item.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
                <div>
                  <p className="font-semibold text-gray-700">{item.content}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No news available.</p>
        )}
      </div>
    </div>
  );
};

export default News;
