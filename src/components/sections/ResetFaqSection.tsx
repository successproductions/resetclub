'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

const faqKeys = ['paid', 'menopause', 'medical', 'duration', 'remote', 'difference'] as const;

const ResetFaqSection: React.FC = () => {
  const t = useTranslations('ResetFaqSection');
  const [openKey, setOpenKey] = useState<(typeof faqKeys)[number] | null>('paid');

  return (
    <section className="bg-white px-6 py-6 md:py-7">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-3xl! font-graphik font-normal leading-tight text-gray-900 md:mb-12 md:text-center md:text-3xl! lg:text-[45px]!">
          {t('title')}
        </h2>

        <div className="border-t border-[#d8cec4]">
          {faqKeys.map((key) => {
            const isOpen = openKey === key;

            return (
              <div key={key} className="border-b border-[#d8cec4]">
                <button
                  type="button"
                  onClick={() => setOpenKey(isOpen ? null : key)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-graphik text-lg! font-normal leading-relaxed text-gray-950 md:text-xl!">
                    {t(`items.${key}.question`)}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#524029] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                      }`}
                    strokeWidth={1.6}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-6 font-graphik text-lg! font-normal leading-relaxed text-gray-700 md:text-lg!">
                      {t(`items.${key}.answer`)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResetFaqSection;
