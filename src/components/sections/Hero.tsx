
'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

const Hero: React.FC = () => {
  const t = useTranslations('Hero');
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    '/images/image1.jpeg',
    '/images/image2.jpeg',
    '/images/image3.jpeg',
    '/images/image4.jpeg',
    '/images/image5.jpeg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-[87vh] flex items-center justify-center lg:justify-start overflow-hidden">
      {/* Image Carousel Background */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Hero image ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-white/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 top-26 lg:top-36 xl:top-0 left-0 md:left-24 mx-2 px-3 pt-4 max-w-4xl bg-white/10 md:bg-white/30 backdrop-blur-sm rounded-sm shadow-lg ">
        {/* Main Heading */}
        <h1 className="text-white mb-3 md:mb-8 font-graphik font-normal">
          <div className="text-3xl md:text-xl lg:text-5xl mb-2 md:mb-4  tracking-wide text-gray-900 ">
            {t('title')}
          </div>
          <div className="text-lg md:text-xl  xl:text-1xl tracking-tight font-normal  text-gray-900">
            {t('subtitle')}
          </div>
        </h1>


        {/* CTA Button */}
        <div className="absolute left-[150px] md:left-48 lg:left-40 transform -translate-x-1/2">
          <Link href="/payment">
            <button className="text-white font-normal bg-transparent border-2 text-lg md:text-xl font-graphik px-2 md:px-4 py-2 mt-2 md:mt-4 hover:border-1 hover:border-gray-200 cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap">
              {t('cta')}
            </button>
          </Link>
        </div>
      </div>

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 z-5 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-500/20 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;