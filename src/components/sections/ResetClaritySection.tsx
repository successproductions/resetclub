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

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white p-0 shadow-none md:p-8 md:shadow-[0_24px_70px_rgba(17,24,39,0.08)]">
            <h3 className="mb-6 max-w-xl font-graphik text-2xl! font-normal leading-tight text-gray-950 md:text-3xl!">
              {t('fit.title')}
            </h3>
            <ul className="space-y-5">
              {fitKeys.map((key) => (
                <li key={key} className="flex gap-4 font-graphik text-lg! font-normal leading-relaxed text-gray-900 md:text-lg!">
                  <span className="mt-2.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-950 text-xs text-white">
                    {fitKeys.indexOf(key) + 1}
                  </span>
                  <span>{t(`fit.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-0 shadow-none md:p-8 md:shadow-[0_24px_70px_rgba(17,24,39,0.08)]">
            <h3 className="mb-6 max-w-xl font-graphik text-2xl! font-normal leading-tight text-gray-950 md:text-3xl!">
              {t('notFit.title')}
            </h3>
            <ul className="space-y-5">
              {notFitKeys.map((key) => (
                <li key={key} className="flex gap-4 font-graphik text-lg! font-normal leading-relaxed text-gray-900 md:text-lg!">
                  <span className="mt-2.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-950 text-xs text-white">
                    {notFitKeys.indexOf(key) + 1}
                  </span>
                  <span>{t(`notFit.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 bg-white p-0 md:p-8 md:shadow-[0_24px_70px_rgba(17,24,39,0.08)]">
          <h3 className="mb-6 font-graphik text-2xl! font-normal text-gray-950 md:text-3xl!">
            {t('notDo.title')}
          </h3>
          <div className="grid gap-x-12 gap-y-3 md:grid-cols-2">
            {notDoKeys.map((key) => (
              <p key={key} className="font-graphik text-lg! font-normal leading-relaxed text-gray-900 md:text-lg!">
                {t(`notDo.${key}`)}
              </p>
            ))}
          </div>
          <p className="mt-8 font-graphik text-lg! font-normal leading-relaxed text-gray-950 md:text-lg! text-center">
            {t('notDo.closing')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResetClaritySection;
