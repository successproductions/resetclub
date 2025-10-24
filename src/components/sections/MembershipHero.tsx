'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ThreeSphere from '@/components/ui/ThreeSphere';

export default function MembershipHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);

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

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Three.js WebGL Sphere Background */}
      <div
        ref={sphereRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 1 }}
      >
        <ThreeSphere />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tight"
          style={{ lineHeight: '1.1' }}
        >
        RESETCLUB
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 font-light"
        >
          Making Wellness a Precision Science
        </p>

        <p
          ref={locationRef}
          className="text-sm md:text-base text-white/70 tracking-[0.3em] uppercase"
        >
          RABAT
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[1px] h-16 bg-white/30 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-white/80"
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
  );
}
