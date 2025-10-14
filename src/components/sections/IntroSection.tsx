'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IntroSection: React.FC = () => {
  const t = useTranslations('IntroSection');
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const arrow1Ref = useRef<HTMLDivElement>(null);
  const arrow2Ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation to show cards when entering intro section
      const showTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });

      showTimeline.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        0
      )
      .fromTo(card1Ref.current,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        0.2
      )
      .fromTo(arrow1Ref.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        0.8
      )
      .fromTo(card2Ref.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        1.2
      )
      .fromTo(arrow2Ref.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        1.8
      )
      .fromTo(card3Ref.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        2.2
      )
      .fromTo(buttonRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        2.8
      );

      // Animation to hide cards when entering key figures section
      gsap.to([titleRef.current, card1Ref.current, card2Ref.current, card3Ref.current, arrow1Ref.current, arrow2Ref.current, buttonRef.current], {
        scrollTrigger: {
          trigger: '#key-figures-section',
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-8 md:py-12 overflow-hidden bg-white">
      {/* Decorative top notch */}
 

      {/* Main container with border */}
      <div className="container mx-auto px-6 relative">
        <div className="relative max-w-7xl mx-auto border-2 border-gray-500 rounded-[3rem] p-3 md:p-6">

          {/* Header */}
          <div className="text-center mb-8">
            <h2 ref={titleRef} className="text-3xl md:text-3xl lg:text-5xl  text-gray-700 mb-1 md:mb-8">
              {t('hook')}
            </h2>
          </div>

          {/* 3 Cards with Arrows */}
          <div className="relative mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

              {/* Card 1: IN */}
              <div ref={card1Ref} className="relative h-full">
                <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-500 hover:border-[#c26d4c] transition-all duration-300 shadow-lg hover:shadow-xl group h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/IN.jpg"
                      alt="Cellular Energy"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  {/* Content */}
                  <div className="px-6 py-2  flex-grow flex flex-col">
                    <h3 className="text-xl font-normal text-gray-700 mb-3 font-graphik">
                      {t('cards.in.title')}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 font-graphik flex-grow">
                      {t('cards.in.subtitle')}
                    </p>
                    <p className="text-[#c26d4c] text-xs italic font-graphik">
                      💬 {t('cards.in.tagline')}
                    </p>
                  </div>
                </div>
                {/* Right Arrow */}
                <div ref={arrow1Ref} className="hidden md:flex absolute top-1/2 -right-12  -translate-y-1/2 z-10 items-center justify-center">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" fill="none" className="w-24 h-14">
                      <path d="M10 30 L70 30" stroke="#ccbaa8" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
                      <path d="M55 15 L80 30 L55 45" stroke="#ccbaa8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 2: OUT */}
              <div ref={card2Ref} className="relative h-full">
                <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-500 hover:border-[#c26d4c] transition-all duration-300 shadow-lg hover:shadow-xl group h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/OUT.jpg"
                      alt="Body Detox"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  {/* Content */}
                  <div className="px-6 py-2 flex-grow flex flex-col">
                    <h3 className="text-xl font-normal text-gray-700 mb-3 font-graphik">
                      {t('cards.out.title')}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 font-graphik flex-grow">
                      {t('cards.out.subtitle')}
                    </p>
                    <p className="text-[#c26d4c] text-xs italic font-graphik">
                      💬 {t('cards.out.tagline')}
                    </p>
                  </div>
                </div>
                {/* Right Arrow */}
                <div ref={arrow2Ref} className="hidden md:flex absolute top-1/2 -right-12 -translate-y-1/2 z-10 items-center justify-center">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" fill="none" className="w-24 h-14">
                      <path d="M10 30 L70 30" stroke="#ccbaa8" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
                      <path d="M55 15 L80 30 L55 45" stroke="#ccbaa8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 3: RESET */}
              <div ref={card3Ref} className="relative h-full">
                <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-500 hover:border-[#c26d4c] transition-all duration-300 shadow-lg hover:shadow-xl group h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/REST.jpg"
                      alt="Inner Balance"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  {/* Content */}
                  <div className="px-6 py-2  flex-grow flex flex-col">
                    <h3 className="text-xl font-normal text-gray-700 mb-3 font-graphik">
                      {t('cards.reset.title')}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 font-graphik flex-grow">
                      {t('cards.reset.subtitle')}
                    </p>
                    <p className="text-[#c26d4c] text-xs italic font-graphik">
                      💬 {t('cards.reset.tagline')}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button ref={buttonRef} className="px-12 py-4 bg-transparent border border-gray-800 text-gray-700 hover:text-white hover:bg-gray-950 text-lg md:text-lg font-medium font-graphik hover:shadow-2xl hover:scale-105 rounded-full transition-all duration-300">
              {t('cta')}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntroSection;