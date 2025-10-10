'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const PracticeComparison: React.FC = () => {
  const t = useTranslations('PracticeComparison');

  const comparisons = [
    {
      key: 'approach',
    },
    {
      key: 'duration',
    },
    {
      key: 'method',
    },
    {
      key: 'team',
    },
    {
      key: 'results',
    }
  ];

  return (
    <section className="pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className=" mb-8 md:mb-16">
         
          <h2 className="text-2xl text-center md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
            {t('title').toUpperCase()}
          </h2>
          <p className="text-base md:text-center md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            {t('subtitle')}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-[#ccbaa8] scrollbar-thumb-rounded-full">
          <div className=" rounded-2xl md:rounded-3xl shadow-lg overflow-hidden min-w-[600px]">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gray-200 text-black">
              <div className="p-3 md:p-6 text-center min-w-[200px]">
                <span className="text-sm md:text-lg ">Critères</span>
              </div>
              <div className="p-3 md:p-6 text-center border-l border-gray-700 min-w-[200px]">
                <span className="text-xs md:text-lg ">Pratiques Traditionnelles</span>
              </div>
              <div className="p-3 md:p-6 text-center bg-[#c26d4c] min-w-[200px]">
                <span className="text-sm md:text-lg  text-white">RESET CLUB</span>
              </div>
            </div>

            {/* Comparison Rows */}
            {comparisons.map((item, index) => (
              <div
                key={item.key}
                className={`grid grid-cols-3 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100 transition-colors duration-200`}
              >
                {/* Criteria */}
                <div className="p-3 md:p-6  text-gray-900 border-b border-gray-200 min-w-[200px]">
                  <span className="text-xs md:text-base leading-tight">{t(`comparisons.${item.key}.criteria`)}</span>
                </div>

                {/* Traditional */}
                <div className="p-3 md:p-6 text-gray-600 border-b border-l border-gray-200 relative min-w-[200px]">
                  <div className="flex items-start md:items-center">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500 mr-2 md:mr-3 flex-shrink-0 flex items-center justify-center mt-0.5 md:mt-0">
                      <svg className="w-1.5 h-1.5 md:w-2 md:h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs md:text-base leading-tight">{t(`comparisons.${item.key}.traditional`)}</span>
                  </div>
                </div>

                {/* Reset Club */}
                <div className="p-3 md:p-6 text-gray-900 border-b border-l border-[#ccbaa8]/30 bg-gradient-to-r from-[#ccbaa8]/5 to-transparent relative min-w-[200px]">
                  <div className="flex items-start md:items-center">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#0fd70c] mr-2 md:mr-3 flex-shrink-0 flex items-center justify-center mt-0.5 md:mt-0">
                      <svg className="w-1.5 h-1.5 md:w-2 md:h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className=" text-xs md:text-base leading-tight">{t(`comparisons.${item.key}.resetClub`)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeComparison;