'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const fitKeys = ['fit1', 'fit2', 'fit3', 'fit4'] as const;
const notFitKeys = ['notFit1', 'notFit2', 'notFit3'] as const;
const notDoKeys = ['notDo1', 'notDo2', 'notDo3', 'notDo4', 'notDo5'] as const;

const ResetClaritySection: React.FC = () => {
  const t = useTranslations('ResetClaritySection');

  return (
    <section className="bg-white px-6 py-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl! font-graphik font-normal leading-tight text-gray-900 md:mb-12 md:text-center md:text-3xl! lg:text-[45px]!">
          {t('title')}
        </h2>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="bg-white p-0 md:p-8">
            <h3 className="mb-6 font-graphik text-2xl! font-normal text-gray-950 md:text-3xl!">
              {t('fit.title')}
            </h3>
            <ul className="space-y-4">
              {fitKeys.map((key) => (
                <li key={key} className="flex gap-3 font-graphik text-lg! font-normal leading-relaxed text-gray-900 md:text-lg!">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#524029]" />
                  <span>{t(`fit.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#f4f3f1] p-6 md:p-8">
            <h3 className="mb-6 font-graphik text-2xl! font-normal text-gray-950 md:text-3xl!">
              {t('notFit.title')}
            </h3>
            <ul className="space-y-4">
              {notFitKeys.map((key) => (
                <li key={key} className="flex gap-3 font-graphik text-lg! font-normal leading-relaxed text-gray-900 md:text-lg!">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#524029]" />
                  <span>{t(`notFit.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-[#fbf8f4] p-6 md:p-8">
          <h3 className="mb-6 font-graphik text-2xl! font-normal text-gray-950 md:text-3xl!">
            {t('notDo.title')}
          </h3>
          <div className="grid gap-x-10 gap-y-4 md:grid-cols-2">
            {notDoKeys.map((key) => (
              <p key={key} className="font-graphik text-lg! font-normal leading-relaxed text-gray-900 md:text-lg!">
                {t(`notDo.${key}`)}
              </p>
            ))}
          </div>
          <p className="mt-6 border-t border-[#d8cec4] pt-6 font-graphik text-lg! font-normal leading-relaxed text-gray-950 md:text-xl!">
            {t('notDo.closing')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResetClaritySection;
