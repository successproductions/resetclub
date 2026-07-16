'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const causeKeys = ['training', 'nutrition', 'nervousSystem', 'imbalances'] as const;

const BiologicalResistanceBlock: React.FC = () => {
  const t = useTranslations('BiologicalResistanceBlock');
  const locale = useLocale();

  return (
    <section className="bg-white px-6 pb-10 md:bg-[#fbf8f4] md:pt-16 md:pb-0">
      <div className="mx-auto grid max-w-7xl items-stretch gap-8 md:grid-cols-[0.92fr_1.08fr] md:gap-12">
        <div className="relative min-h-[420px] overflow-hidden  bg-black md:min-h-[720px]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/website-banner-vdo2.mp4" type="video/mp4" />
            <source src="/videos/website-banner-vdo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="flex flex-col justify-center bg-white px-0 py-0 md:bg-transparent">
          <div className="max-w-3xl md:py-4">
            <h2 className="mb-8 text-3xl! leading-tight text-gray-950 md:text-3xl! lg:text-[29px]!">
              {t('title')}
            </h2>

            <div className="space-y-6">
              {causeKeys.map((key, index) => (
                <div key={key} className="border-t border-[#d8cec4] pt-5">
                  <h3 className="mb-2 font-graphik text-lg! font-normal text-gray-950 md:text-lg!">
                    {t(`causes.${key}.title`)}
                  </h3>
                  <p className="font-graphik text-lg! leading-relaxed text-gray-700 md:text-lg!">
                    {t(`causes.${key}.description`)}
                  </p>
                  <p className="mt-2 font-graphik text-lg! font-normal leading-relaxed text-gray-950 md:text-lg!">
                    {t(`causes.${key}.result`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4 border-t border-[#d8cec4] pt-6">
              <p className="font-graphik text-lg! font-normal text-gray-950 md:text-lg!">
                {t('fault')}
              </p>
              <p className="font-graphik text-lg! leading-relaxed text-gray-700 md:text-lg!">
                {t('closing')}
              </p>
              <Link
                href={`/${locale}/payment`}
                className="inline-block bg-transparent font-normal font-graphik text-gray-900 hover:text-white px-8 py-4 border border-[#524029] text-lg! hover:bg-gray-950 cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl md:text-lg!"
              >
                {t('cta')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiologicalResistanceBlock;
