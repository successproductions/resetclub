'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Director: React.FC = () => {
  const t = useTranslations('TeamPage.director');

  return (
    <section className="pt-4 md:py-10 bg-white">
      <div className="md:max-w-7xl md:mx-auto md:px-6">
        <div className="grid lg:grid-cols-2 md:gap-12 items-start">
          {/* Title - Mobile First */}
          <div className="lg:hidden px-6">
            <h1 className="text-3xl font-graphik font-normal text-[#524029] leading-tight mb-3">
              {t('title')}
              <br />
              {t('subtitle')}
            </h1>
          </div>

          {/* Title - Desktop */}
          <div className="hidden lg:block  space-y-1">
            <div>
              <h1 className="text-3xl md:text-3xl lg:text-5xl font-graphik font-normal text-[#524029] md:mb-4 leading-tight">
                {t('title')}
                <br />
                {t('subtitle')}
              </h1>
            </div>

            {/* Description - Desktop */}
            <div className="md:space-y-4 space-y-2 text-[#524029] font-normal font-graphik text-lg md:text-xl xl:text-1xl leading-relaxed">
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

          {/* Image Section - Full Width on Mobile */}
          <div className="relative lg:order-last">
            <div className="relative h-[478px] md:h-[750px] xl:h-[640px] w-full overflow-hidden">
              <Image
                src="/images/nahed2.png"
                alt="Sarah Martinez - Directrice Générale RESET CLUB"
                fill
                className="object-cover md:object-fill"
                sizes="(max-width: 1000px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Description - Mobile Last */}
          <div className="lg:hidden px-6">
            <div className="space-y-2 text-[#524029] font-normal mt-2 font-graphik text-lg leading-relaxed">
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
        </div>
      </div>
    </section>
  );
};

export default Director;
