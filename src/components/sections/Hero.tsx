
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
    '/images/image1.jpeg',
    '/images/image2.jpeg',
    '/images/image3.jpeg',
    '/images/image4.jpeg',
    '/images/image5.jpeg',
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
      <div className="relative z-10 top-26 left-0 mx-2 max-w-4xl px-3 pt-4 md:left-24 lg:top-36 xl:top-0">
        <div className="relative max-w-5xl bg-[linear-gradient(90deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.72)_42%,rgba(255,255,255,0)_100%)] px-5 py-5 md:px-4 md:py-7">

          <h1 className="relative mb-4 font-graphik font-normal md:mb-6">
            <div className="relative mb-2 min-h-[4rem] overflow-hidden text-3xl tracking-wide text-gray-900 md:mb-4 md:min-h-[3.5rem] md:text-xl lg:min-h-[2.5rem] lg:text-4xl">
              {sliderTexts.map((text, index) => (
                <span
                  key={text}
                  className={`absolute left-0 top-0 transition-all duration-700 ${index === currentSlide
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-8 opacity-0'
                    }`}
                >
                  {text}
                </span>
              ))}
            </div>
            <div className="text-lg font-normal tracking-tight text-gray-900 md:text-xl xl:text-1xl">
              {t('subtitle')}
            </div>
          </h1>

          {/* CTA Button */}
          <Link href="/payment" className="relative inline-block">
            <button className="whitespace-nowrap border-2 bg-white/25 px-3 py-2 font-graphik text-lg font-normal text-black shadow-lg transition-all duration-300 hover:scale-105 hover:border-gray-200 hover:bg-gray-950 hover:text-white hover:shadow-xl md:px-5 md:text-xl">
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
