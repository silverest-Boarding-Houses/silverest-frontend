'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import emailjs from 'emailjs-com';
import Footer from '../Components/Footer';


// Sample data for demonstration
const house = {
  images: [
    'https://i.pinimg.com/564x/e6/7e/c2/e67ec24e3265e5d935f17bb0543ada66.jpg',
    'https://i.pinimg.com/564x/8d/72/3f/8d723f1a6f07dc6897e199edf7dcad59.jpg',
    'https://i.pinimg.com/564x/9e/f5/6a/9ef56a0124d1d95f882ad7624bc8c2ca.jpg',
    'https://i.pinimg.com/564x/9e/f5/6a/9ef56a0124d1d95f882ad7624bc8c2ca.jpg',
    'https://i.pinimg.com/564x/9e/f5/6a/9ef56a0124d1d95f882ad7624bc8c2ca.jpg',
  ],
  location: 'Mangochi, Cape Maclear',
  price: 'MWK 55,000,000',
  type: 'Single Family Home',
  description: 'Beautiful home with a spacious backyard.',
  agent: {
    photo: 'https://i.pinimg.com/564x/5f/f3/f0/5ff3f0f447b4cf9ab24524e8ab63799b.jpg',
    name: 'Ulimbe Kuleza',
    email: 'Kuleza26@gmail.com',
    phone: '08886262527',
  },
  reviews: [
    { name: 'Alice', comment: 'This house is amazing! I love the backyard.', rating: 5 },
    { name: 'Bob', comment: 'Great location and spacious rooms.', rating: 4 },
    { name: 'Charlie', comment: 'The design is beautiful, but the price is a bit high.', rating: 3 },
  ],
};

const ViewMore = () => {
  const { images, location, price, type, description, agent, reviews } = house;
  const [likeCount, setLikeCount] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [alertMessage, setAlertMessage] = useState('');

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emailjs.send(
        'service_d2amn18',
        'template_5s2b6yg',
        formData,
        'V2l92uT0mj_aOcKWc'
      );
      setAlertMessage('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setAlertMessage('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="h-full w-full bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* House Images Section */}
          <div className="flex flex-col space-y-4">
            <Image
              src={images[0]} // Main image
              alt="Main House Image"
              width={800}
              height={500}
              className="rounded-lg object-cover"
            />
            <div className="grid grid-cols-3 gap-4">
              {images.slice(1).map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`House Image ${index + 1}`}
                  width={250}
                  height={150}
                  className="rounded-lg object-cover"
                />
              ))}
            </div>
          </div>

          {/* Agent Info & Contact Form */}
          <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{location}</h2>
            <p className="text-gray-600">{description}</p>
            <p className="mt-2 text-lg font-semibold">Price: {price}</p>
            <p className="text-gray-600">Type: {type}</p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold">Agent Information</h3>
              <div className="mt-4 flex items-center space-x-4">
                <img
                  src={agent.photo}
                  alt="Agent Photo"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-semibold">{agent.name}</p>
                  <p className="text-gray-600">{agent.email}</p>
                  <p className="text-gray-600">{agent.phone}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold">Contact the Agent</h3>
              {alertMessage && <p className="text-green-600">{alertMessage}</p>}
              <form className="mt-4 space-y-4" onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Like Button */}
            <button
              onClick={handleLike}
              className="mt-4 inline-flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Like {likeCount > 0 && `(${likeCount})`}
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <p className="font-semibold">{review.name}</p>
                  <span className="ml-2 text-yellow-500">{"★".repeat(review.rating)}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Leave a Comment</h3>
          <form onSubmit={handleCommentSubmit} className="mt-4 space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Write your comment here"
            ></textarea>
            <div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit Comment
              </button>
            </div>
          </form>

          {/* Display Comments */}
          <div className="mt-4 space-y-2">
            {comments.map((comment, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded-md">
                <p className="text-gray-700">{comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewMore;
