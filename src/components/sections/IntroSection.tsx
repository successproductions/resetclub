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
      // Animation only when scrolling DOWN (entering from top)
      const showTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
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
      {/* Main container - Full width */}
      <div className="w-full relative">
        <div className="relative w-full">

          {/* Header */}
          <div className="text-center mx-auto md:max-w-5xl mt-1 mb-6 md:mb-8 px-6">
            <h2 ref={titleRef} className="text-3xl md:text-3xl lg:text-5xl text-[#524029] mb-1 md:mb-8">
              {t('hook')}
            </h2>
          </div>

          {/* 3 Cards with Arrows - Full Width */}
          <div className="relative mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 items-stretch">

              {/* Card 1: IN */}
              <div ref={card1Ref} className="relative h-full">
                <div className="bg-white overflow-hidden hover:border-[#c26d4c] transition-all duration-300 hover:shadow-xl group h-full flex flex-col">
                  {/* Image - Increased height */}
                  <div className="relative h-96 md:h-96 lg:h-[700px] overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/IN.jpg"
                      alt="Cellular Energy"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  {/* Content */}
                  <div className="px-6 py-4 flex-grow flex flex-col">
                    <h3 className="text-xl font-normal text-[#524029] mb-2 font-graphik">
                      {t('cards.in.title')}
                    </h3>
                    <p className="text-[#524029] text-lg leading-5.5 mb-2 font-graphik flex-grow">
                      {t('cards.in.subtitle')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: OUT */}
              <div ref={card2Ref} className="relative h-full">
                <div className="bg-white overflow-hidden hover:border-[#c26d4c] transition-all duration-300 hover:shadow-xl group h-full flex flex-col">
                  {/* Image - Increased height */}
                  <div className="relative h-96 md:h-96 lg:h-[700px] overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/linktree1.png"
                      alt="Body Detox"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  {/* Content */}
                  <div className="px-6 py-4 flex-grow flex flex-col">
                    <h3 className="text-xl font-normal text-[#524029] mb-2 font-graphik">
                      {t('cards.out.title')}
                    </h3>
                    <p className="text-[#524029] text-lg leading-5.5 mb-2 font-graphik flex-grow">
                      {t('cards.out.subtitle')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: RESET */}
              <div ref={card3Ref} className="relative h-full">
                <div className="bg-white overflow-hidden hover:border-[#c26d4c] transition-all duration-300 hover:shadow-xl group h-full flex flex-col">
                  {/* Image - Increased height */}
                  <div className="relative h-96 md:h-96 lg:h-[700px] overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/OUT.jpg"
                      alt="Inner Balance"
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  {/* Content */}
                  <div className="px-6 py-4 flex-grow flex flex-col">
                    <h3 className="text-xl font-normal text-[#524029] mb-2 leading-1.5 font-graphik">
                      {t('cards.reset.title')}
                    </h3>
                    <p className="text-[#524029] text-lg leading-5.5 mb-2 font-graphik flex-grow">
                      {t('cards.reset.subtitle')}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center px-6">
            <button ref={buttonRef} className="md:px-12 px-10 py-4 bg-transparent border border-gray-800 text-[#524029] hover:text-white hover:bg-gray-950 text-lg md:text-lg font-medium font-graphik transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
              {t('cta')}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntroSection;