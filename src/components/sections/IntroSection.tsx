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
        <div className="relative max-w-7xl mx-auto border-2 border-[#ccbaa8] rounded-[3rem] p-6 md:p-6">

          {/* Header */}
          <div className="text-center mb-8">
            <h2 ref={titleRef} className="text-2xl md:text-3xl lg:text-4xl font-normal text-gray-950 mb-8">
              {t('hook')}
            </h2>
          </div>

          {/* 3 Cards with Arrows */}
          <div className="relative mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

              {/* Card 1: IN */}
              <div ref={card1Ref} className="relative">
                <div className="bg-[#9c948b] rounded-3xl p-8 text-center border border-[#5a3d0e] hover:border-[#ccbaa8] transition-all duration-300">
                  <div className="text-white text-sm mb-4">1</div>
                  <h3 className="text-2xl font-semibold text-white mb-6">In</h3>
                  <div className="w-20 h-20 mx-auto mb-6 relative">
                    <Image
                      src="/images/in.svg"
                      alt="In"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Neurosciences & Biohacking pour reprogrammer votre métabolisme de l&apos;intérieur
                  </p>
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
              <div ref={card2Ref} className="relative">
                <div className="bg-[#9c948b] rounded-3xl p-8 text-center border border-[#5a3d0e] hover:border-[#ccbaa8] transition-all duration-300">
                  <div className="text-white text-sm mb-4">2</div>
                  <h3 className="text-2xl font-semibold text-white mb-6">Out</h3>
                  <div className="w-20 h-20 mx-auto mb-6 relative">
                    <Image
                      src="/images/out.svg"
                      alt="Out"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Techniques avancées pour sculpter votre silhouette et révéler votre potentiel physique
                  </p>
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
              <div ref={card3Ref} className="relative">
                <div className="bg-[#9c948b] rounded-3xl p-8 text-center border border-[#5a3d0e] hover:border-[#ccbaa8] transition-all duration-300">
                  <div className="text-white text-sm mb-4">3</div>
                  <h3 className="text-2xl font-semibold text-white mb-6">Reset</h3>
                  <div className="w-20 h-20 mx-auto mb-6 relative">
                    <Image
                      src="/images/reset.svg"
                      alt="Reset"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Coaching transformationnel pour libérer vos blocages émotionnels et mentaux
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button ref={buttonRef} className="px-12 py-4 bg-transparent border border-[#ccbaa8] text-black hover:text-white hover:bg-[#ccbaa8] text-lg font-medium  hover:shadow-2xl hover:scale-105 transition-all duration-300">
              {t('cta').toUpperCase()}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntroSection;