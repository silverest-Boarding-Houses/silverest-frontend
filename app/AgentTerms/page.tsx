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
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Agent Terms and Conditons</h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
             The Agent will be given agent account upon being approved by the admin to become our agent
             The Agent shall be given his or her cut when the house that the agent has uploaded has been booked
            </p>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
            The Agent will get 5% commission upon finding the house and the house has been booked
            The Agent shall keep his or her login details private failure to do so it will lead to account revocation
            The Top agent shall be accessed and granted admin role which will come with high commission
            The agent that will motivate customer to use this webiste to book a house at silverest shall be awarded a reward
            The Agent shall never expose the landlord number to client if the agent exposes landlord number to client and leading to bypassing our site for finding a house the agent account will be revoked
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
             
      
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
