'use client';

import React from 'react';
import Image from 'next/image';

const Trustpilot: React.FC = () => {
  const trustScore = 4.8;
  const totalReviews = 147;

  return (
    <section className="py-4 md:py-8 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Trustpilot Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              src="/images/trustpilot-2.svg"
              alt="Trustpilot"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-4xl font-bold text-gray-900">Trustpilot</span>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className="w-16 h-16 md:w-20 md:h-20 bg-[#00b67a] flex items-center justify-center"
              >
                <Image
                  src="/images/trustpilot-2.svg"
                  alt="Star"
                  width={48}
                  height={48}
                  className="w-10 h-10 md:w-12 md:h-12 brightness-0 invert"
                />
              </div>
            ))}
          </div>

          {/* TrustScore */}
          <div className="text-2xl md:text-3xl text-gray-600 font-medium">
            TrustScore <span className="font-bold text-gray-900">{trustScore}</span> |{' '}
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
