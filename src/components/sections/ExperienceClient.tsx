'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ExperienceClient: React.FC = () => {
  const t = useTranslations('ExperienceClient');

  //  VIDEO VERSION - COMMENTED OUT FOR TESTING
  return (
    <section id="programmes-holistiques" className="relative h-[65vh] md:h-[65vh] lg:h-[80vh] xl:h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover "
        >
          <source src="/videos/videobg.mp4" type="video/mp4" />
        </video>
      <div className="absolute inset-0 bg-black opacity-10"></div>
      </div>

      <div className="relative z-10 w-full">
        <div className="flex flex-col gap-4 lg:gap-8 items-center justify-center">
          {/* Title - Always at the top */}
          <div className="text-center w-full px-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900">
              L&apos;expérience client
            </h2>
          </div>

          {/* Image - In the middle */}
          <div className="relative w-full h-[320px] md:h-[350px] lg:h-[600px] md:max-w-7xl md:mx-auto md:px-6">
              {/* Mobile Image */}
              <Image
                src="/images/LOGO+INFO-02.png"
                alt="L'expérience client"
                fill
                className="object-contain md:hidden"
                sizes="100vw"
                priority
              />
              {/* Desktop Image */}
              <Image
                src="/images/LOGO+INFO.png"
                alt="L'expérience client"
                fill
                className="object-contain hidden md:block"
                sizes="(min-width: 768px) 100vw"
                priority
              />
          </div>

          {/* Call to Action - At the bottom */}
          <div className="text-center px-6">
            <Link
              href="/payment"
              className="inline-block bg-transparent text-gray-900 px-8 py-4 font-graphik font-medium text-lg border border-[#524029] hover:bg-gray-950 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Réserver mon Bilan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
  

  // TEST VERSION - Static Background Image
  return (
    <section className="relative h-[70vh] md:h-[60vh] flex items-center overflow-hidden">
      {/* Background Image with Filter */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/testbg1.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay filter */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-1 lg:gap-12 items-center">
          {/* Title - First on Mobile */}
          <div className="text-center lg:hidden w-full order-1">
            <h2 className="text-3xl md:text-4xl font-normal text-white mb-1">
              L&apos;expérience client
            </h2>
          </div>

          {/* Left Side - Image - Second on Mobile */}
          <div className="relative w-full h-[360px] md:h-[350px] lg:h-[950px] order-2 lg:order-none">
            <Image
              src="/images/lexperienceClient3.png"
              alt="L'expérience client"
              fill
              className="object-contain h-full"
              sizes=""
              priority
            />
          </div>

          {/* Decorative Line Separator */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%]">
            <svg
              width="2"
              height="100%"
              viewBox="0 0 2 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-30"
            >
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="400"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="10 10"
              />
            </svg>
          </div>

          {/* Right Side - Content - Third on Mobile */}
          <div className="text-center lg:text-left order-3 lg:order-none">
            {/* Title - Only on Desktop */}
            <h2 className="hidden lg:block text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-2 md:mb-8">
              L&apos;expérience client
            </h2>

            <Link
              href="/contact"
              className="inline-block bg-transparent text-white px-8 py-4 font-graphik font-medium text-lg border border-white hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Réserver mon Bilan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceClient;
