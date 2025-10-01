'use client';

import React from 'react';
import Image from 'next/image';

const LogoBanner: React.FC = () => {
  // Array of 6 logo URLs - replace these with your actual partner/client logos
  const logos = [
    'https://logoeps.com/wp-content/uploads/2013/03/nike-vector-logo.png',
    'https://genevivclinic.com/wp-content/uploads/2023/11/Screenshot-2023-10-31-at-14.03-1.png',
    'https://files.elfsightcdn.com/eafe4a4d-3436-495d-b748-5bdce62d911d/47afd6c4-b91c-4ce9-b10a-f9a9af3f73e5/BBC_News_2022_-Alt-svg.png',
    'https://files.elfsightcdn.com/eafe4a4d-3436-495d-b748-5bdce62d911d/35965875-d411-4d5a-b2d8-340e1535d440/TheTimes1.jpg',
    'https://files.elfsightcdn.com/eafe4a4d-3436-495d-b748-5bdce62d911d/38da90a8-76c5-4ea2-91ab-452a046346f9/718010b318dd4f24ffad6a2f6fcd3fc8.png',
    'https://genevivclinic.com/wp-content/uploads/2023/11/InMode_Logo-1.png',
    'https://genevivclinic.com/wp-content/uploads/2024/02/Screenshot-2024-02-21-at-16.06.12.png'
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
                className="flex-shrink-0 w-32 h-16 md:w-48 md:h-24 mx-4 md:mx-8 flex items-center justify-center bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <Image
                  src={logo}
                  alt={`Partner Logo ${index + 1}`}
                  width={80}
                  height={40}
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 md:w-[120px] md:h-[60px]"
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
                className="flex-shrink-0 w-32 h-16 md:w-48 md:h-24 mx-4 md:mx-8 flex items-center justify-center bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <Image
                  src={logo}
                  alt={`Partner Logo ${index + 1}`}
                  width={80}
                  height={40}
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 md:w-[120px] md:h-[60px]"
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