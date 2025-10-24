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
    <section className="md:pb-1 pb-4  pt-3 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className=" mb-4 md:mb-16">
          <h2 className="text-3xl md:text-center md:text-3xl lg:text-5xl text-[#524029] mb-2 md:mb-6">
            {t('title')}
          </h2>
          <p className="text-lg md:text-center md:text-lg font-graphik text-[#524029] max-w-3xl mx-auto ">
            {t('subtitle')}
          </p>
        </div>
        {/* Comparison Table */}
        {/* <div className="overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-[#ccbaa8] scrollbar-thumb-rounded-full">
          <div className=" shadow-lg overflow-hidden min-w-[600px]">

            <div className="grid grid-cols-3 bg-white font-graphik font-medium text-gray-700">
              <div className="p-3 md:p-6 text-center border-b border-gray-200 min-w-[200px] ">
                <span className="text-lg md:text-lg  ">Critères</span>
              </div>
              <div className="p-3 md:p-6 text-center border-l border-b border-gray-200 min-w-[200px]">
                <span className="text-lg md:text-lg ">Pratiques </span>
              </div>
              <div className="p-3  md:p-6 text-center border-l border-b border-gray-200 min-w-[200px]">
                <span className="text-lg md:text-lg ">RESET CLUB</span>
              </div>
            </div>


            {comparisons.map((item, index) => (
              <div
                key={item.key}
                className={`grid grid-cols-3 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-white'
                } hover:bg-gray-100 transition-colors duration-200`}
              >
                
                <div className="p-3 md:p-6  text-gray-900 border-b border-gray-200 min-w-[200px]">
                  <span className="text-xs md:text-base font-graphik text-gray-500 font-medium  leading-tight">{t(`comparisons.${item.key}.criteria`)}</span>
                </div>

               
                <div className="p-3 md:p-6 text-gray-700 border-b border-l border-gray-200 relative min-w-[200px]">
                  <div className="flex items-start md:items-center">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#98d1d2] mr-2 md:mr-3 flex-shrink-0 flex items-center justify-center mt-0.5 md:mt-0">
                      <svg className="w-1.5 h-1.5 md:w-2 md:h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs md:text-base font-medium font-graphik leading-tight">{t(`comparisons.${item.key}.traditional`)}</span>
                  </div>
                </div>

               
                <div className="p-3 md:p-6 text-gray-700 border-b border-l border-[#ccbaa8]/30 bg-gradient-to-r from-[#ccbaa8]/5 to-transparent relative min-w-[200px]">
                  <div className="flex items-start md:items-center">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#98d1d2] mr-2 md:mr-3 flex-shrink-0 flex items-center justify-center mt-0.5 md:mt-0">
                      <svg className="w-1.5 h-1.5 md:w-2 md:h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className=" text-xs md:text-base leading-tight font-graphik font-medium">{t(`comparisons.${item.key}.resetClub`)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default PracticeComparison;