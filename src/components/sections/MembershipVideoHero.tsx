'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import SplitType from 'split-type';
import MembershipApplicationForm from '@/components/ui/MembershipApplicationForm';

const MembershipVideoHero: React.FC = () => {
  const t = useTranslations('MembershipVideoHero');
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSubRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(47);

  useEffect(() => {
    // Split text into characters and words
    if (titleMainRef.current && titleSubRef.current && subtitleRef.current) {
      const titleMainSplit = new SplitType(titleMainRef.current, {
        types: 'chars,words',
        tagName: 'span'
      });

      const titleSubSplit = new SplitType(titleSubRef.current, {
        types: 'chars,words',
        tagName: 'span'
      });

      const subtitleSplit = new SplitType(subtitleRef.current, {
        types: 'chars,words',
        tagName: 'span'
      });

      // Create timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate main title characters
      tl.from(titleMainSplit.chars, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        stagger: 0.02,
        duration: 1,
        ease: 'back.out(1.7)'
      })
      // Animate sub title characters
      .from(titleSubSplit.chars, {
        opacity: 0,
        y: 50,
        stagger: 0.015,
        duration: 0.8
      }, '-=0.4')
      // Animate subtitle characters
      .from(subtitleSplit.chars, {
        opacity: 0,
        y: 50,
        stagger: 0.01,
        duration: 0.8
      }, '-=0.5')
      // Animate CTA button
      .from(ctaRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.6
      }, '-=0.3');

      // Cleanup
      return () => {
        titleMainSplit.revert();
        titleSubSplit.revert();
        subtitleSplit.revert();
      };
    }
  }, []);

  // Online users counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = prev + change;
        // Keep between 35 and 65 users
        return Math.max(35, Math.min(65, newValue));
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Online Users Counter */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 bg-white/10 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full shadow-lg">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
            <span className="text-white font-graphik font-normal text-sm md:text-base">
              <span className="font-semibold">{onlineUsers}</span> utilisateurs en ligne
            </span>
          </div>
        </div>

        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            // loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/SANDMOTIONLOGO.mov" type="video/mp4" />
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 md:px-6 max-w-6xl mx-auto">
          {/* Main Title */}
          <h1
            ref={titleMainRef}
            className="text-5xl md:text-6xl lg:text-7xl font-graphik font-bold text-white text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-4 tracking-wide leading-tight"
          >
            {t('titleMain')}
          </h1>

          {/* Sub Title */}
          <h2
            ref={titleSubRef}
            className="text-3xl md:text-4xl lg:text-5xl font-graphik font-normal text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-6 md:mb-8 tracking-wide leading-tight"
          >
            {t('titleSub')}
          </h2>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-base md:text-lg lg:text-xl  text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-8 md:mb-10 leading-relaxed font-graphik font-normal max-w-3xl mx-auto"
          >
            {t('subtitle')}
          </p>
        </div>

        {/* CTA Button - Positioned at bottom */}
        <div ref={ctaRef} className="absolute bottom-[15vh] left-0 right-0 z-10 text-center px-4">
          <button
            onClick={() => setIsFormOpen(true)}
            className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-normal bg-white/10 backdrop-blur-sm border-2 border-white/50 text-base md:text-lg font-graphik px-6 md:px-10 py-3 md:py-4 hover:bg-white/20 hover:border-white cursor-pointer transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-white/20"
          >
            {t('cta')}
          </button>
        </div>
      </section>

      {/* Membership Application Form Popup */}
      <MembershipApplicationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </>
  );
};

export default MembershipVideoHero;
