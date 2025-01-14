"use client";

import React from "react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <>
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Section: Text */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            About Us
          </h2>
          <p className="text-lg text-gray-600 mb-4 leading-relaxed">
            We are dedicated to providing students with safe, affordable, and comfortable off-campus accommodations. With a range of options tailored to suit different needs and budgets, we aim to make your living experience stress-free and enjoyable.
          </p>
          <p className="text-lg text-gray-600 mb-4 leading-relaxed">
            Our mission is to bridge the gap between students and high-quality housing by offering easy access to verified listings, secure environments, and amenities that make you feel at home.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Whether you're looking for a quiet space to study or a vibrant community to connect with others, we've got you covered. Let us help you find the perfect place to live while you focus on your academic journey.
          </p>
        </div>

        {/* Right Section: Image */}
        <div>
          <Image
            src="/images/about-us.jpg" // Replace with your own image path
            alt="About Us"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
    </>
  );
};

export default AboutUs;
