'use client';

import React from 'react';
import Image from 'next/image';

const Trustpilot: React.FC = () => {
  const trustScore = 4.8;
  const totalReviews = 147;

  return (
    <section className="py-4 pb-6 md:py-0 md:pb-10 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Trustpilot Logo */}
          <div className="flex items-center justify-center gap-1 md:gap-2 mb-1">
            <Image
              src="/images/trustpilot-2.svg"
              alt="Trustpilot"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="md:text-4xl text-3xl font-graphik text-gray-700">Trustpilot</span>
          </div>

          {/* Trustpilot Rating Image */}
          <div className="flex justify-center ">
            <Image
              src="/images/trustpilot-stars.png"
              alt="Trustpilot 5 Stars"
              width={230}
              height={60}
              className="w-auto h-12 md:h-20"
            />
          </div>

          {/* TrustScore */}
          <div className="text-lg md:text-3xl font-graphik text-gray-500 ">
            TrustScore <span className=" text-gray-800">{trustScore}</span> |{' '}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#00b67a] transition-colors"
            >
              {totalReviews} reviews
            </a>
          </div>
        </div>

        {/*
          INSTRUCTIONS TO REPLACE WITH REAL TRUSTPILOT:
          1. Go to https://business.trustpilot.com/
          2. Login and go to "TrustBox" section
          3. Choose "Mini" widget
          4. Copy the embed code
          5. Replace this section with your Trustpilot embed code
        */}
      </div>
    </section>
  );
};

export default Trustpilot;
