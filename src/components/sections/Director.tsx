'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Director: React.FC = () => {
  const t = useTranslations('TeamPage.director');

  return (
    <section className="py-4 md:py-10 bg-white ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12  items-start">
          {/* Content Section */}
          <div className="space-y-1  ">
            {/* Header */}
            <div>
              <div className="text-[#c26d4c] font-normal md:mb-2 uppercase tracking-wider text-lg">
                {t('name')}
              </div>
              <h1 className="text-3xl md:text-3xl lg:text-4xl font-graphik font-normal text-gray-700 md:mb-4 leading-tight">
                {t('title')}
                <br />
                {t('subtitle')}
              </h1> 
            </div>

            {/* Description */}
            <div className="md:space-y-4 space-y-2 text-gray-500 font-normal font-graphik text-lg md:text-xl xl:text-1xl leading-relaxed">
              <p>
                {t('bio1')}
              </p>

              <p>
                {t('bio2')}
              </p>

              <p>
                {t('bio3')}
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="relative h-[425px] md:h-[600px]  w-full rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&h=1200&fit=crop&q=80"
                alt="Sarah Martinez - Directrice Générale RESET CLUB"
                fill
                className="object-cover md:object-fill "
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Director;
