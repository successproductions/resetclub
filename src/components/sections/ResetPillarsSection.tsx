'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const pillars = [
  {
    key: 'movement',
    image: '/images/IN2.png',
  },
  {
    key: 'neuro',
    image: '/images/RESET2.png',
  },
  {
    key: 'coaching',
    image: '/images/OUT2.png',
  },
] as const;

const ResetPillarsSection: React.FC = () => {
  const t = useTranslations('ResetPillarsSection');

  return (
    <section className="bg-[#f4f3f1] px-6 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto mb-10 max-w-5xl text-center text-3xl! font-graphik font-normal leading-tight text-gray-950 md:text-3xl! lg:text-[45px]!">
          {t('title')}
        </h2>
        <div className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <div key={pillar.key} className="relative h-[420px] overflow-hidden md:h-[520px]">
                <Image
                  src={pillar.image}
                  alt={t(`pillars.${pillar.key}.title`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                  <h3 className="font-graphik text-2xl! font-normal leading-tight text-white md:text-3xl!">
                    {t(`pillars.${pillar.key}.title`)}
                  </h3>
                  {t.has(`pillars.${pillar.key}.title2`) && (
                    <h3 className="font-graphik text-2xl! font-normal leading-tight text-white md:text-3xl!">
                      {t(`pillars.${pillar.key}.title2`)}
                    </h3>
                  )}
                  {t.has(`pillars.${pillar.key}.title3`) && (
                    <h3 className="font-graphik text-2xl! font-normal leading-tight text-white md:text-3xl!">
                      {t(`pillars.${pillar.key}.title3`)}
                    </h3>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.key}
                className="border-t border-[#ded8d0] px-7 py-8 md:min-h-[190px] md:border-t-0 md:px-10 md:py-10 md:[&:not(:last-child)]:border-r"
              >
                <p className="mb-4 font-graphik text-lg! font-normal leading-relaxed text-gray-950 md:text-lg! md:text-center">
                  {t(`pillars.${pillar.key}.description`)}
                  {t(`pillars.${pillar.key}.tools`)}
                </p>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section >
  );
};

export default ResetPillarsSection;
