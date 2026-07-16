'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Activity, BatteryCharging, Moon, Orbit } from 'lucide-react';

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
  const locale = useLocale();

  const stats = [
    {
      key: 'sleep',
      value: 30,
      prefix: '+',
      decimals: false,
      Icon: Moon,
    },
    {
      key: 'energy',
      value: 25,
      prefix: '+',
      decimals: false,
      Icon: BatteryCharging,
    },
    {
      key: 'fatigue',
      value: 40,
      prefix: '−',
      decimals: false,
      Icon: Activity,
    },
    {
      key: 'bodyRelation',
      value: 70,
      prefix: '',
      decimals: false,
      Icon: Orbit,
    }
  ];

  return (
    <section id="key-figures-section" className="relative overflow-hidden bg-[#f4f3f1] px-6 py-5 md:pt-6">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div className="md:pt-2">
          <div className="mb-6 h-px w-20 bg-[#524029]"></div>
          <h2 className="max-w-3xl text-3xl! leading-tight text-gray-950 md:text-3xl! lg:text-[35px]!">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-20 md:gap-y-20">
          {stats.map(({ Icon, ...stat }) => (
            <div key={stat.key}>
              <div className="flex items-center gap-5">
                <Icon className="h-12 w-12 shrink-0 text-[#7b7066] md:h-10 md:w-10" strokeWidth={1} />
                <div className="font-graphik text-4xl! font-normal leading-none text-gray-950 md:text-5xl!">
                  <span>{stat.prefix}</span>
                  <AnimatedCounter
                    end={stat.value}
                    decimals={stat.decimals}
                    duration={2200}
                  />
                  <span>{t(`stats.${stat.key}.unit`)}</span>
                </div>
              </div>
              <p className="mt-4 max-w-md pl-0 font-graphik text-lg! font-normal leading-relaxed text-gray-700 md:pl-0 md:text-lg!">
                {t(`stats.${stat.key}.label`)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-center mt-7 md:font-semibold! text-gray-700  md:text-gray-950 text-lg! md:text-3xl! lg:text-[18px]! 
       ">
        {t('description')}
      </h2>
      <div className="mx-auto mt-4 flex max-w-7xl justify-center md:mt-10">

        <Link
          href={`/${locale}/payment`}
          className="inline-block bg-transparent font-normal font-graphik text-gray-900 hover:text-white px-8 py-4 border border-[#524029] text-lg! hover:bg-gray-950 cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl md:text-lg!"
        >
          {t('cta')}
        </Link>
      </div>
    </section>
  );
};

export default KeyFigures;
