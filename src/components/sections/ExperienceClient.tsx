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
      <div className="absolute inset-0 bg-black opacity-5"></div>
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
                src="/images/shema.png"
                alt="L'expérience client"
                fill
                className="object-contain md:hidden"
                sizes="100vw"
                priority
              />
              {/* Desktop Image */}
              <Image
                src="/images/shema_mobile.png"
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

};

export default ExperienceClient;
