'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Button from './Button';

const StickyBookingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const t = useTranslations('ContactPage');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show CTA after scrolling 20% of the page
      const showThreshold = documentHeight * 0.2;

      // Hide CTA when near footer (last 100px)
      const hideThreshold = documentHeight - windowHeight - 100;

      setIsVisible(scrollPosition > showThreshold);
      setIsHidden(scrollPosition > hideThreshold);
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Check initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isHidden) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white shadow-lg border-t border-gray-200 px-4 py-3 md:px-6 md:py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Text Content */}
        <div className="flex-1 mr-4">
          <h3 className="text-lg md:text-xl text-gray-900 mb-1">
            {t('cta.title')}
          </h3>
          <p className="text-sm md:text-base text-gray-600 hidden sm:block">
            {t('cta.subtitle')}
          </p>
        </div>

        {/* CTA Button */}
        <Button
          variant="primary"
          size="lg"
          href="/contact"
          className="whitespace-nowrap"
        >
          {t('cta.title')}
        </Button>
      </div>
    </div>
  );
};

export default StickyBookingCTA;