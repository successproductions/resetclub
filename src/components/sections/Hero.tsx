
'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

const Hero: React.FC = () => {
  const t = useTranslations('Hero');
  const [currentImage, setCurrentImage] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    '/images/hero/hero1.jpeg',
    '/images/hero/hero2.jpeg',
    '/images/hero/hero3.jpeg',
    '/images/hero/hero4.jpeg'
  ];

  const sliderTexts = [
    t('slider.metabolism'),
    t('slider.nervousSystem'),
    t('slider.energy'),
    t('slider.body'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderTexts.length);
    }, 2600);

    return () => clearInterval(interval);
  }, [sliderTexts.length]);

  return (
    <section className="relative h-[87vh] flex items-center justify-center lg:justify-start overflow-hidden">
      {/* Image Background */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'
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
      <div className="relative z-10 top-26 left-0 mx-2 w-[calc(100vw-2rem)] px-3 xl:px-1 pt-4 md:left-24 md:w-[calc(100vw-8rem)] lg:top-36 xl:top-0 xl:w-[min(88vw,2600px)]">
        <div className="relative w-full px-0 xl:px-0 py-5 md:px-4 md:py-7">

          <h1 className="relative mb-4 font-graphik font-normal md:mb-6">
            <div className="relative mb-2 min-h-[2rem] overflow-hidden text-[18px] tracking-wide text-white md:mb-4 md:min-h-[3.5rem] md:text-2xl lg:min-h-[4.9rem] lg:text-6xl xl:text-7xl">
              {sliderTexts.map((text, index) => (
                <span
                  key={text}
                  className={`absolute left-0 top-0 whitespace-nowrap transition-all duration-700 ${index === currentSlide
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-8 opacity-0'
                    }`}
                >
                  {text}
                </span>
              ))}
            </div>
            <div className="text-lg font-normal tracking-tight text-white md:text-xl xl:text-1xl">
              {t('subtitle')}
            </div>
          </h1>

          {/* CTA Button */}
          <Link href="/payment" className="relative inline-block">
            <button className="whitespace-nowrap border-2  px-3 py-2 font-graphik text-lg font-normal text-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-gray-200  hover:text-white hover:shadow-xl md:px-5 md:text-xl">
              {t('cta')}
            </button>
          </Link>
        </div>
      </div>

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 z-5 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-500/5 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
