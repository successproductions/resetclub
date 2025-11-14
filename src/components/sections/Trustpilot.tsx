'use client';

import React from 'react';
import Image from 'next/image';

const Trustpilot: React.FC = () => {
  const trustScore = 4.8;
  const totalReviews = 147;

  return (
    <section className="py-3 pb-4 md:py-0 md:pb-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          {/* Trustpilot Logo */}
          <div className="flex items-center justify-center gap-1 mb-1">
            <Image
              src="/images/trustpilot-2.svg"
              alt="Trustpilot"
              width={32}
              height={32}
              className="w-7 h-7 md:w-8 md:h-8"
            />
            <span className="text-xl md:text-2xl font-graphik text-gray-700">Trustpilot</span>
          </div>

          {/* Trustpilot Rating Image */}
          <div className="flex justify-center">
            <Image
              src="/images/trustpilot-stars.png"
              alt="Trustpilot 5 Stars"
              width={180}
              height={45}
              className="w-auto h-8 md:h-12"
            />
          </div>

          {/* TrustScore */}
          <div className="text-sm md:text-lg font-graphik text-gray-500">
            TrustScore <span className="text-gray-800">{trustScore}</span> |{' '}
            <span className="text-gray-800">
              {totalReviews} reviews
            </span>
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
