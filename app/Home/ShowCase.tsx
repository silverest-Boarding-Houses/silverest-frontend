"use client";

import React from "react";
import Image from "next/image";

const Services = () => {
  const services = [
    {
      title: "Affordable Housing",
      description:
        "Find budget-friendly accommodations that meet your needs without compromising on comfort.",
      image: "/images/affordable-housing.jpg",
    },
    {
      title: "Proximity to Campus",
      description:
        "Enjoy housing options located within walking distance or a short commute to campus.",
      image: "",
    },
    {
      title: "Secure Environment",
      description:
        "Stay safe with 24/7 security and secure access to all accommodations.",
      image: "/images/secure-environment.jpg",
    },
   
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          why choose us?
        </h2>
        <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          We find boardinghouses at silverhouse for you and post them on our website inorder to easily find a good boardinghouse that suits your needs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
            >
              <Image
                src={service.image}
                alt={service.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
