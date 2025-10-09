'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const PRESS_LOGOS = [
  { name: 'Forbes', logo: 'https://logo.clearbit.com/forbes.com' },
  { name: 'BBC', logo: 'https://logo.clearbit.com/bbc.com' },
  { name: 'CNN', logo: 'https://logo.clearbit.com/cnn.com' },
  { name: 'Le Monde', logo: 'https://logo.clearbit.com/lemonde.fr' },
  { name: 'TF1', logo: 'https://logo.clearbit.com/tf1.fr' },
  { name: 'France 2', logo: 'https://logo.clearbit.com/france.tv' },
  { name: 'Marie Claire', logo: 'https://logo.clearbit.com/marieclaire.com' },
  { name: 'Vogue', logo: 'https://logo.clearbit.com/vogue.com' },
];

const PressBanner: React.FC = () => {
  const t = useTranslations('PressBanner');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PRESS_LOGOS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-2 md:py-14 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#ccbaa8_1px,transparent_1px),linear-gradient(-45deg,#ccbaa8_1px,transparent_1px)] bg-[length:20px_20px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-4 md:mb-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-3xl lg:text-4xl  text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Decorative Line */}
        <div className="w-24 h-1 bg-gradient-to-r from-[#c26d4c] to-[#c26d4c] mx-auto mb-4 md:mb-12" />

        {/* Press Logos Carousel */}
        <div className="relative">
          {/* Desktop: Static Grid */}
          <div className="hidden md:grid grid-cols-4 gap-8 items-center justify-items-center">
            {PRESS_LOGOS.map((press, index) => (
              <div
                key={index}
                className="group relative w-full h-24 flex items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="relative w-full h-full opacity-80">
                  <Image
                    src={press.logo}
                    alt={press.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden relative h-48 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {PRESS_LOGOS.map((press, index) => (
                <div
                  key={index}
                  className="min-w-full flex items-center justify-center px-6"
                >
                  <div className="relative w-full max-w-sm h-32 bg-white rounded-xl shadow-md border-2 border-gray-200">
                    <div className="absolute inset-4">
                      <Image
                        src={press.logo}
                        alt={press.name}
                        fill
                        className="object-contain opacity-80"
                        sizes="(max-width: 768px) 300px"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {PRESS_LOGOS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-[#ccbaa8]'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        {/* <div className="text-center mt-12">
          <SubmitButton
            variant="secondary"
            href="/contact"
            className="min-w-64 center font-le-jour-serif text-sm lg:text-1xl md:text-lg whitespace-nowrap"
          >
            {t('cta')}
          </SubmitButton>
        </div> */}
            
      </div>
    </section>
  );
};

export default PressBanner;