'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const t = useTranslations('Hero');
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://rakxawellness.com/wp-content/uploads/2025/08/website-banner-vdo.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100" />
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-white mb-8">
          <div className="text-lg md:text-xl lg:text-2xl font-light mb-4 tracking-wide text-white">
            {t('title')}
          </div>
          <div className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white">
            {t('subtitle')}
          </div>
        </h1>


        {/* Scroll Indicator */}
        <div className="absolute  left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
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