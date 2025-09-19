'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const TeamSlider: React.FC = () => {
  const t = useTranslations('TeamPage.team');
  const [currentIndex, setCurrentIndex] = useState(0);

  const teamMembers = [
    {
      id: 1,
      key: 'sarah',
      image: "https://media.sixsenses.com/B60H3R33/at/59kb6f3rfrq76gn8fb9gng7/Alphinah_Ashinai.jpg?format=webp&width=680&height=900&fit=crop"
    },
    {
      id: 2,
      key: 'marc',
      image: "https://media.sixsenses.com/B60H3R33/at/3cfgp7953pj9t9f3tbqj9p6/Wellness_Acupuncture.jpg?format=webp&width=680&height=900&fit=crop"
    },
    {
      id: 3,
      key: 'amina',
      image: "https://media.sixsenses.com/B60H3R33/at/59kb6f3rfrq76gn8fb9gng7/Alphinah_Ashinai.jpg?format=webp&width=680&height=900&fit=crop"
    },
    {
      id: 4,
      key: 'thomas',
      image: "https://media.sixsenses.com/B60H3R33/at/3cfgp7953pj9t9f3tbqj9p6/Wellness_Acupuncture.jpg?format=webp&width=680&height=900&fit=crop"
    },
    {
      id: 5,
      key: 'fatima',
      image: "https://media.sixsenses.com/B60H3R33/at/59kb6f3rfrq76gn8fb9gng7/Alphinah_Ashinai.jpg?format=webp&width=680&height=900&fit=crop"
    },
    {
      id: 6,
      key: 'alexandre',
      image: "https://media.sixsenses.com/B60H3R33/at/3cfgp7953pj9t9f3tbqj9p6/Wellness_Acupuncture.jpg?format=webp&width=680&height=900&fit=crop"
    }
  ];

  const itemsPerPageDesktop = 3;
  const itemsPerPageMobile = 1;
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const itemsPerPage = isMobile ? itemsPerPageMobile : itemsPerPageDesktop;
  const totalPages = Math.ceil(teamMembers.length / itemsPerPage);

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'right' && currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getCurrentPageMembers = () => {
    const startIndex = currentIndex * itemsPerPage;
    return teamMembers.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <section className="py-6  md:pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            {t('expertsTitle').toUpperCase()}
          </h2>
        </div>

        {/* Navigation Buttons - Mobile */}
        <div className="flex justify-center gap-4 mb-8 md:hidden">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border border-[#ccbaa8] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-lg"
            disabled={currentIndex === 0}
          >
            <svg className="w-5 h-5 text-[#ccbaa8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border border-[#ccbaa8] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-lg"
            disabled={currentIndex === totalPages - 1}
          >
            <svg className="w-5 h-5 text-[#ccbaa8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Navigation and Team Grid - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {/* Left Navigation Button */}
          <button
            onClick={() => scroll('left')}
            className="flex-shrink-0 w-12 h-12 rounded-full border border-[#ccbaa8] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-lg"
            disabled={currentIndex === 0}
          >
            <svg className="w-5 h-5 text-[#ccbaa8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Team Grid */}
          <div className="grid grid-cols-3 gap-8 flex-1">
            {getCurrentPageMembers().map((member) => (
              <div key={member.id} className="text-center space-y-6">
                {/* Image */}
                <div className="relative h-96 w-full overflow-hidden mx-auto">
                  <Image
                    src={member.image}
                    alt={t(`members.${member.key}.name`)}
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900">
                  {t(`members.${member.key}.name`)}
                </h3>

                {/* Role */}
                <div className="text-gray-600 font-medium">
                  {t(`members.${member.key}.role`)}
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {t(`members.${member.key}.description`)}
                </p>
              </div>
            ))}
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={() => scroll('right')}
            className="flex-shrink-0 w-12 h-12 rounded-full border border-[#ccbaa8] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-lg"
            disabled={currentIndex === totalPages - 1}
          >
            <svg className="w-5 h-5 text-[#ccbaa8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Team Grid - Mobile */}
        <div className="md:hidden">
          <div className="space-y-8">
            {getCurrentPageMembers().map((member) => (
              <div key={member.id} className="text-center space-y-4">
                {/* Image */}
                <div className="relative h-80 w-full max-w-sm overflow-hidden mx-auto rounded-lg">
                  <Image
                    src={member.image}
                    alt={t(`members.${member.key}.name`)}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900">
                  {t(`members.${member.key}.name`)}
                </h3>

                {/* Role */}
                <div className="text-gray-600 font-medium">
                  {t(`members.${member.key}.role`)}
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed px-4">
                  {t(`members.${member.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSlider;