'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const bioKeys = [
  'bio1',
  'bio2',
  'bio3',
  'bio4',
  'bio5',
  'bio6',
  'bio7',
  'bio8',
  'bio9',
  'bio10',
  'bio11',
  'bio12',
  'bio13',
] as const;

const Director: React.FC = () => {
  const t = useTranslations('TeamPage.director');
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-white px-6 py-10 md:py-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl! font-graphik font-normal leading-tight text-gray-900 md:mb-12 md:text-3xl! lg:text-[45px]! md:text-center">
          {t('title')}
        </h2>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <div className="relative h-[520px] w-full overflow-hidden md:h-[680px] lg:h-[760px]">
              <Image
                src="/images/nahed2.png"
                alt={t('imageAlt')}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="">
              <p className="font-graphik text-2xl! font-normal text-gray-950 md:text-3xl!">
                {t('name')}
              </p>
              <p className="mt-2 font-graphik text-lg! font-normal leading-relaxed text-gray-700 md:text-lg!">
                {t('role')}
              </p>
            </div>

            <div
              className={`relative mt-4 overflow-hidden transition-[max-height] duration-700 ${isExpanded ? 'max-h-[2200px]' : 'max-h-[560px] md:max-h-[585px] lg:max-h-[560px]'
                }`}
            >
              <div className="space-y-4 font-graphik text-lg! font-normal leading-relaxed text-gray-900 md:text-lg!">
                {bioKeys.map((key) => (
                  <p key={key}>{t(key)}</p>
                ))}
              </div>
              {!isExpanded && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/90 to-transparent" />
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded((current) => !current)}
              className="mt-3 self-start font-graphik text-lg! font-normal text-gray-900 underline underline-offset-4 transition-colors hover:text-[#524029] md:text-lg!"
            >
              {isExpanded ? t('readLess') : t('readMore')}
            </button>

            <div className="mt-6">
              <Link
                href={`/${locale}/payment`}
                className="inline-block bg-transparent px-8 py-4 font-graphik text-lg! font-normal text-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-950 hover:text-white hover:shadow-xl border border-[#524029] md:text-lg!"
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

export default Director;
