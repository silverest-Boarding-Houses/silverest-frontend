'use client';

import React, { useState, useEffect } from 'react';

// Define the interface for a blog
interface Blog {
  title: string;
  content: string;
  image: string;
}

const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/news');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data: Blog[] = await response.json();
        setBlogs(data);
      } catch (error) {
        const typedError = error as Error; // Type assertion
        setError(`An error occurred: ${typedError.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Our Latest <span className="text-indigo-600">Blogs</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover insightful articles, expert tips, and the latest trends. Dive into our blog and stay updated with our latest posts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && <p className="text-gray-600 text-center col-span-full">Loading...</p>}
          {error && <p className="text-red-500 text-center col-span-full">{error}</p>}
          {blogs.length === 0 && !error && !loading && (
            <p className="text-red-600 text-center col-span-full">No blogs available at the moment.</p>
          )}
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={blog.image}
                alt={blog.content}
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
              <p className="text-gray-600 mb-4">{blog.content}</p>
              <a href="#" className="text-indigo-600 hover:underline text-lg font-medium">Read more →</a>
            </div>
          ))}
        </div>
        {/* Center the 'View All' button */}
        <div className="flex justify-center mt-8">
          <button className="bg-green-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-orange-700 transition duration-300">
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
