'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import ThreeSphere from '@/components/ui/ThreeSphere';
import MembershipApplicationForm from '@/components/ui/MembershipApplicationForm';

export default function MembershipHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showStickyButton, setShowStickyButton] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for initial animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate title with stagger effect on letters
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || '';
        titleRef.current.innerHTML = titleText
          .split('')
          .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');

        tl.fromTo(
          titleRef.current.querySelectorAll('span'),
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.02 },
          0.3
        );
      }

      // Animate subtitle
      tl.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        0.8
      );

      // Animate location
      tl.fromTo(
        locationRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        1
      );

      // Animate sphere container - fade in
      if (sphereRef.current) {
        tl.fromTo(
          sphereRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 2 },
          0
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Scroll handler for sticky button
  useEffect(() => {
    const handleScroll = () => {
      const ctaSection = document.querySelector('#membership-cta');
      const scrollThreshold = window.innerHeight * 0.1; // 10vh

      if (ctaSection) {
        const ctaTop = ctaSection.getBoundingClientRect().top;

        // Show sticky button after scrolling 10vh
        // Hide when CTA section is in view
        if (window.scrollY > scrollThreshold && ctaTop > window.innerHeight) {
          setShowStickyButton(true);
        } else {
          setShowStickyButton(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <MembershipApplicationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      {/* Sticky Button - Top Right (Desktop only) */}
      {showStickyButton && (
        <button
          onClick={() => setIsFormOpen(true)}
          className="hidden md:block fixed top-8 right-12 z-50 px-6 py-3 border border-black bg-transparent text-black font-medium font-graphik transition-all duration-300 hover:bg-black hover:text-white whitespace-nowrap"
        >
          Apply for Membership
        </button>
      )}

    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Header - Logo (and button on desktop) */}
      <header className="absolute top-0 left-0 right-0 z-20 px-4 py-4 md:px-12 md:py-8">
        <div className="flex items-center justify-center md:justify-between gap-2">
          {/* Logo */}
          <div className="relative w-44 h-24 md:w-40 lg:w-64 lg:h-28 md:h-14">
            <Image
              src="/images/logoresetclubnoir.png"
              alt="Reset Club Logo"
              fill
              className="object-contain"
            />
          </div>

          {/* Apply for Membership Button - Desktop only */}
          <button
            onClick={() => setIsFormOpen(true)}
            className="hidden md:block px-6 py-3 border border-black bg-transparent text-black font-medium font-graphik transition-all duration-300 hover:bg-black hover:text-white whitespace-nowrap"
          >
            Apply for Membership
          </button>
        </div>
      </header>

      {/* Apply for Membership Button - Mobile only (bottom) */}
      <div className="absolute bottom-20 left-0 right-0 z-20 px-4 md:hidden">
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full px-6 py-3 border border-black bg-transparent text-black font-medium font-graphik transition-all duration-300 hover:bg-black hover:text-white"
        >
          Apply for Membership
        </button>
      </div>

      {/* Three.js WebGL Sphere Background */}
      <div
        ref={sphereRef}
        className="absolute inset-0  flex items-center justify-center"
        style={{ zIndex: 1 }}
      >
        <ThreeSphere />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold font-graphik text-white mb-3 md:mb-4 tracking-tight"
          style={{ lineHeight: '1.1' }}
        >
        RESETCLUB
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-3 md:mb-6 font-light font-graphik"
        >
          Making Wellness a Precision Science
        </p>

        <p
          ref={locationRef}
          className="text-sm md:text-base text-white/70 tracking-[0.3em] uppercase font-graphik"
        >
          RABAT
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-1  md:bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[1px] h-16 bg-[#0bcee1] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-black/80"
            style={{
              animation: 'scrollIndicator 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollIndicator {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </section>
    </>
  );
}
