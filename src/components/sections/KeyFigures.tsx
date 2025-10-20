'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

interface CounterProps {
  end: number;
  duration?: number;
  decimals?: boolean;
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, duration = 2000, decimals = false }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset to 0 when entering viewport
          setCount(0);

          const startTime = Date.now();
          const startValue = 0;

          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (end - startValue) * easeOut;

            setCount(currentValue);

            if (progress < 1) {
              animationFrameRef.current = requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          // Cancel any ongoing animation before starting new one
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }

          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Cancel animation when leaving viewport
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = counterRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [end, duration]);

  const formatNumber = (num: number) => {
    if (decimals) {
      return num.toLocaleString('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    return Math.floor(num).toLocaleString();
  };

  return <span ref={counterRef}>{formatNumber(count)}</span>;
};

const KeyFigures: React.FC = () => {
  const t = useTranslations('KeyFigures');

  const stats = [
    {
      key: 'weightLoss',
      value: 1990,
      decimals: true
    },
    {
      key: 'satisfaction',
      value: 95,
      decimals: false
    },
    {
      key: 'objectives',
      value: 90,
      decimals: false
    }
  ];

  return (
    <section id="key-figures-section" className=" py-2 md:pt-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#ccbaa8] rounded-full blur-3xl -translate-x-36 -translate-y-36"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#ccbaa8] rounded-full blur-3xl translate-x-36 translate-y-36"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="md:text-center mb-2 md:mb-6">

          <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#524029] mb-1 md:mb-2">
            {t('title')}
          </h2>
          <p className='text-[#524029] text-lg mb-3 md:mb-6 md:text-xl font-graphik '>{t('description')}</p>
          {/* <div className="w-20 h-1 bg-[#c26d4c] mx-auto rounded-full"></div> */}
        </div>

        {/* Stats Container */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ccbaa8]/30 to-transparent"></div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16">
            {stats.map((stat) => (
              <div key={stat.key} className="relative group">
                {/* Background Circle */}
                <div className="absolute inset-0 bg-[#ccbaa8]/5 rounded-full scale-90 group-hover:scale-100 transition-transform duration-500"></div>

                {/* Content */}
                <div className="relative text-center py-3 md:py-12">
                  {/* Top Line */}
                  {/* <div className="w-12 md:w-16 h-px bg-[#c26d4c] mx-auto mb-4 md:mb-8"></div> */}

                  {/* Animated Number */}
                  <div className="mb-2 md:mb-6">
                    <div className="text-3xl md:text-6xl lg:text-6xl font-light text-[#524029] mb-2">
                      <AnimatedCounter
                        end={stat.value}
                        decimals={stat.decimals}
                        duration={2500}
                      />
                      <span className="">
                        {t(`stats.${stat.key}.unit`)}
                      </span>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="  mx-auto">
                    <p className="text-[#524029] text-lg md:text-base xl:text-xl font-graphik  leading-relaxed">
                      {t(`stats.${stat.key}.label`)}
                    </p>
                  </div>

                  {/* Bottom Line */}
                  <div className="w-14 h-0.5 md:h-1 md:w-16 rounded-full  bg-[#524029] mx-auto mt-1 md:mt-8"></div>
                   {/* <div className="w-20 h-1 bg-[#c26d4c] mx-auto rounded-full"></div> */}

                  {/* Dot indicator */}
                  {/* <div className="absolute -bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2 w-3 md:w-4 h-3 md:h-4 bg-[#c26d4c] rounded-full border-2 md:border-4 border-white shadow-lg"></div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFigures;