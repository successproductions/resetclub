'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function NotreHistoireSection() {
  const t = useTranslations('NotreHistoirePage.nahed');
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation - slide in from left
      gsap.from(textRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'restart none restart none',
        },
      });

      // Video animation - slide in from right
      gsap.from(videoRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'restart none restart none',
        },
      });

      // Button animation - fade in and scale
      gsap.from(buttonRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'restart none restart none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const videoElement = videoElementRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is in view, play it
            videoElement.play().catch((error) => {
              // Autoplay might be blocked by browser, that's okay
              console.log('Autoplay prevented:', error);
            });
          } else {
            // Video is out of view, pause it
            videoElement.pause();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of video is visible
      }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-4 md:py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Mobile: Title */}
        <h2 ref={textRef} className="text-3xl md:hidden uppercase text-gray-700 leading-tight mb-3 md:mb-6 md:text-center">
          {t('bio1')}
        </h2>

        <div className="grid md:grid-cols-2 gap-4 md:gap-12 items-center">
          {/* Text Section - Desktop */}
          <div className="hidden md:block space-y-6">
            <h2 className="text-3xl md:text-4xl  text-gray-700 leading-tight">
              {t('bio1')}
            </h2>

            <p className="text-lg md:text-lg font-graphik text-gray-500 leading-relaxed ">
              {t('bio2')}
            </p>

            <Link
              ref={buttonRef}
              href="/contact"
              className="inline-block bg-transparent font-graphik text-gray-900 border border-[#c26d4c] px-8 py-3 rounded-full hover:text-white hover:bg-[#2b8a7c] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('seeMore')}
            </Link>
          </div>

          {/* Video Section */}
          <div ref={videoRef} className="relative rounded-2xl overflow-hidden shadow-2xl md:order-last">
            <div className="aspect-video bg-gray-900">
              <video
                ref={videoElementRef}
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                playsInline
                muted
              >
                <source src="/videos/notre-histoire.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Text and Button - Mobile only */}
          <div className="md:hidden space-y-6">
            <p className="text-lg text-gray-500 mb-2 font-graphik leading-relaxed">
              {t('bio2')}
            </p>

            <div className="text-center">
              <Link
                ref={buttonRef}
                href="/contact"
                className="inline-block bg-transparent font-graphik font-medium text-lg text-gray-700 border border-gray-800 px-8 py-3 rounded-full hover:text-white hover:bg-gray-950 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('seeMore')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
