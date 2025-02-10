"use client";

import React from "react";
import Image from "next/image";
import Footer from "../Components/Footer";

const AboutUs = () => {
  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section: Text */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Customer Terms and Conditons</h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
             Booking Fee is non refundable because when you book its like we have reserved a place for you and that place can not be given to everybody else
             since it has already been reserved for you that means other customer will be declined to book that room,
            </p>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
            The fee will be refundable ONLY IF and ONLY IF  the room has some conditions that we didnt specify on our description
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
                You are encouraged to have booking number when you are about to enter the house to indeed confirm that its you whi has booked the room
      
            </p>
            
          </div>

          {/* Right Section: Image */}
          <div>
            <Image
              src="https://isograft.com/bh/Kasanda%20Boarding%20House.jpg" // Replace with your own image path
              alt="About Us"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        
      </section>
      <Footer></Footer>
    </>
    
  );

};

export default AboutUs;
