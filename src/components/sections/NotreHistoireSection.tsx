'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function NotreHistoireSection() {
  const t = useTranslations('NotreHistoirePage.nahed');
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const videoElementMobileRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingMobile, setIsPlayingMobile] = useState(false);

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
            videoElement.pause();
          }
        });
      },
      {
        threshold: 0.5, 
      }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handlePlayVideo = () => {
    if (videoElementRef.current) {
      setIsPlaying(true);
      videoElementRef.current.play().catch((error) => {
        console.log('Play prevented:', error);
      });
    }
  };

  const handlePlayVideoMobile = () => {
    if (videoElementMobileRef.current) {
      setIsPlayingMobile(true);
      videoElementMobileRef.current.play().catch((error) => {
        console.log('Play prevented:', error);
      });
    }
  };

  return (
    <section id="notre-histoire" ref={sectionRef} className="py-4 md:py-1 bg-white">
      <div className="md:container md:mx-auto md:px-4">
        <div className="grid md:grid-cols-2 gap-4 md:gap-12 items-center">
          {/* Text Section - Desktop */}
          <div className="hidden md:block space-y-6">
            <h2 className="text-3xl md:text-4xl  text-gray-900 leading-tight">
              {t('bio1')}
            </h2>

            <p className="text-lg md:text-lg font-graphik text-gray-900 leading-relaxed ">
              {t('bio2')}
            </p>

            <Link
              ref={buttonRef}
              href="/payment"
              className="inline-block text-lg bg-transparent font-graphik text-gray-900 border border-gray-900 px-8 py-3  hover:text-white hover:bg-gray-900 font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('seeMore')}
            </Link>
          </div>

          {/* Video Section - Desktop */}
          <div ref={videoRef} className="hidden md:block relative overflow-hidden md:mb-8 shadow-2xl md:order-last">
            <div className="h-[600px] lg:h-[770px]  bg-gray-900 relative">
              {!isPlaying ? (
                // Thumbnail with Play Button
                <div className="relative w-full h-full">
                  <Image
                    src="/images/nahed1.png"
                    alt="Notre Histoire"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={handlePlayVideo}
                      className="w-24 h-24 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg"
                      aria-label="Play video"
                    >
                      <Play className="w-12 h-12 text-gray-900 ml-1" fill="currentColor" />
                    </button>
                  </div>
                </div>
              ) : (
                <video
                  ref={videoElementRef}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  playsInline
                  muted
                  onPause={() => setIsPlaying(false)}
                >
                  <source src="/videos/notre-histoire.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>

          {/* Video Section - Mobile with Custom Thumbnail */}
          <div className="md:hidden w-full">
            {/* Text Section - Above Thumbnail */}
            <div className="mb-6 px-4">
              <h2 className="text-3xl text-gray-900 leading-tight mb-1">
                Et si ce que vous<br />
                cherchez n&apos;était pas<br />
                un régime… <br/>
                mais une renaissance ?
              </h2>
              
            </div>

            {/* Thumbnail or Video - Full Width */}
            <div className="relative w-full h-[500px] ">
              {!isPlayingMobile ? (
                // Thumbnail with Play Button
                <div className="relative w-full h-full">
                  <Image
                    src="/images/nahed1.png"
                    alt="Notre Histoire"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <button
                      onClick={handlePlayVideoMobile}
                      className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg"
                      aria-label="Play video"
                    >
                      <Play className="w-10 h-10 text-gray-900 ml-1" fill="currentColor" />
                    </button>
                  </div>
                </div>
              ) : (
                // Video Player
                <div className="relative w-full h-full bg-gray-900">
                  <video
                    ref={videoElementMobileRef}
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                    muted
                    onPause={() => setIsPlayingMobile(false)}
                  >
                    <source src="/videos/notre-histoire.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </div>

          {/* Text and Button - Mobile only */}
          <div className="md:hidden space-y-6 px-4">
            <div className="text-center">
              <Link
                ref={buttonRef}
                href="/payment"
                className="inline-block bg-transparent font-graphik font-medium text-lg text-gray-900 border border-gray-800 px-8 py-3 hover:text-white hover:bg-gray-950 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
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
