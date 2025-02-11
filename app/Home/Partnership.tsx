'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: "What is the process of booking a room?",
    answer: "explore into our boarding houses by clicking  Get started   and start looking for your house according to your preferences"
  },
  {
    question: "How do I pay?",
    answer: "after finding a house click book now and fill the form and click pay  now, you can pay using MTN momo payments and airtel Money"
  },
  {
    question: "what next after i book?",
    answer: "you will be provided with booking number as a reference that will be used when physically visiting the house and we will send confirmation email."
  },

  {
    question: "any Questions?",
    answer: "Contact us on the website on contact us page "
  },
];

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="px-6 py-4 bg-gray-100 text-gray-800">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
