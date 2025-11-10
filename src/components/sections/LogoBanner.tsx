'use client';

import React from 'react';
import Image from 'next/image';

const LogoBanner: React.FC = () => {
  // Array of 6 logo URLs - replace these with your actual partner/client logos
  const logos = [
    '/images/2m.png',
    '/images/athqafiya.png',
    '/images/hit_radio.png',
    '/images/m1.png',
    '/images/medradio.png',
    '/images/telemaroc.png',
    '/images/mfm.png'
  ];

  return (
    <section className="bg-white py-8 overflow-hidden w-full">
      <div className="w-full">
        {/* Logo Slider Container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-32 h-18 md:w-48 md:h-24 mx-4 md:mx-8 mb-2 flex items-center  justify-center bg-gray-50 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <Image
                  src={logo}
                  alt={`Partner Logo ${index + 1}`}
                  width={80}
                  height={40}
                  className="object-contain opacity-100 hover:opacity-100 transition-opacity duration-300 md:w-[120px] md:h-[60px]"
                  unoptimized={true}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-32 h-18 md:w-48 md:h-24 mx-4 md:mx-8 flex items-center justify-center bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <Image
                  src={logo}
                  alt={`Partner Logo ${index + 1}`}
                  width={80}
                  height={40}
                  className="object-contain opacity-100 hover:opacity-100 transition-opacity duration-300 md:w-[120px] md:h-[60px]"
                  unoptimized={true}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoBanner;