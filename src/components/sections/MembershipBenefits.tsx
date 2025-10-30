'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

interface BenefitItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

function BenefitItem({ title, content, isOpen, onClick }: BenefitItemProps) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onClick}
        className="w-full py-3 flex items-center justify-between text-left transition-all hover:bg-white/5"
      >
        <span className="text-lg md:text-xl border-b border-gray-300 font-medium font-graphik text-black uppercase tracking-wide pb-2 inline-block">
          {title}
        </span>
        <ChevronDown
          className={`w-6 h-6 text-black transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-black leading-relaxed px-2 text-base md:text-lg font-graphik">
          {content}
        </p>
      </div>
    </div>
  );
}

export default function MembershipBenefits() {
  const t = useTranslations('PracticeComparison');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const benefits = [
    {
      title: t('comparisons.approach.criteria'),
      content: t('comparisons.approach.resetClub'),
    },
    {
      title: t('comparisons.duration.criteria'),
      content: t('comparisons.duration.resetClub'),
    },
    {
      title: t('comparisons.method.criteria'),
      content: t('comparisons.method.resetClub'),
    },
    {
      title: t('comparisons.team.criteria'),
      content: t('comparisons.team.resetClub'),
    },
    {
      title: t('comparisons.results.criteria'),
      content: t('comparisons.results.resetClub'),
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative min-h-[70dvh] flex items-center justify-center bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center ">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-black/60 mb-4 font-graphik">
            THE RESET CLUB EXPERIENCE
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-graphik text-black mb-6">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed font-graphik">
            {t('subtitle').split('||')[0].trim()}
          </p>
        </div>

        {/* Dropdown Items */}
        <div className=" py-2 md:p-12 ">
          {benefits.map((benefit, index) => (
            <BenefitItem
              key={index}
              title={benefit.title}
              content={benefit.content}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

        
      </div>
    </section>
  );
}
