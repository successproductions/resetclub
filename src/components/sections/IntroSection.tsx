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
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      // Card 1 animation
      gsap.from(card1Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: -100,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      // Arrow 1 animation
      gsap.from(arrow1Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: -20,
        duration: 0.6,
        delay: 0.5,
        ease: 'power3.out',
      });

      // Card 2 animation
      gsap.from(card2Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 100,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
      });

      // Arrow 2 animation
      gsap.from(arrow2Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: -20,
        duration: 0.6,
        delay: 0.7,
        ease: 'power3.out',
      });

      // Card 3 animation
      gsap.from(card3Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: 100,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out',
      });

      // Button animation
      gsap.from(buttonRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-8 md:py-12 overflow-hidden bg-gradient-to-br from-[#1a3a52] via-[#2d5875] to-[#1a3a52]">
      {/* Decorative top notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-gradient-to-b from-[#ccbaa8] to-transparent rounded-b-full" />

      {/* Main container with border */}
      <div className="container mx-auto px-6 relative">
        <div className="relative max-w-7xl mx-auto border-2 border-[#4a6b85] rounded-[3rem] p-6 md:p-6">

          {/* Header */}
          <div className="text-center mb-8">
            <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#ccbaa8] mb-8">
              {t('hook')}
            </h2>
          </div>

          {/* 3 Cards with Arrows */}
          <div className="relative mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

              {/* Card 1: IN */}
              <div ref={card1Ref} className="relative">
                <div className="bg-[#2d5875] rounded-3xl p-8 text-center border border-[#4a6b85] hover:border-[#ccbaa8] transition-all duration-300">
                  <div className="text-white/60 text-sm mb-4">1</div>
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
                <div ref={arrow1Ref} className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#ccbaa8]">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </div>

              {/* Card 2: OUT */}
              <div ref={card2Ref} className="relative">
                <div className="bg-[#2d5875] rounded-3xl p-8 text-center border border-[#4a6b85] hover:border-[#ccbaa8] transition-all duration-300">
                  <div className="text-white/60 text-sm mb-4">2</div>
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
                <div ref={arrow2Ref} className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#ccbaa8]">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </div>

              {/* Card 3: RESET */}
              <div ref={card3Ref} className="relative">
                <div className="bg-[#2d5875] rounded-3xl p-8 text-center border border-[#4a6b85] hover:border-[#ccbaa8] transition-all duration-300">
                  <div className="text-white/60 text-sm mb-4">3</div>
                  <h3 className="text-2xl font-semibold text-white mb-6">Reset™</h3>
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
            <button ref={buttonRef} className="px-12 py-4 bg-gradient-to-r from-[#ccbaa8] to-[#b8a695] text-white text-lg font-medium rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
              {t('cta')}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntroSection;