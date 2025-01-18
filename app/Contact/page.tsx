'use client';

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Footer from "../Components/Footer";

const ContactUs: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        "service_g59xed5", // Replace with your Service ID
        "template_tc96qha", // Replace with your Template ID
        form.current!,
        "HlMFIQVluZ-Bfo1qv" // Replace with your Public Key
      )
      .then(
        (result) => {
          setIsSubmitting(false);
          setSuccessMessage("Your message has been sent successfully!");
          setErrorMessage("");
          form.current?.reset();
        },
        (error) => {
          setIsSubmitting(false);
          setErrorMessage("An error occurred. Please try again.");
          setSuccessMessage("");
        }
      );
  };

  return (
    <>
      <header className="bg-green-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Contact Us</h1>
      </header>

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Get in Touch</h2>
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="user_name"
                type="text"
                name="user_name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="user_email"
                type="email"
                name="user_email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 text-white rounded-lg ${
                isSubmitting ? "bg-green-600 cursor-not-allowed" : "bg-green-600 hover:bg-orange-600"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {successMessage && <p className="text-green-600 text-sm mt-2">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
          </form>
        </div>
  

      </div>
      <Footer></Footer>
    
    </>
  );
};

export default ContactUs;
