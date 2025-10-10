'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VideoCarousel: React.FC = () => {
  const t = useTranslations('VideoCarousel');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const videos = [
    {
      id: 1,
      src: '/videos/carousellevideo1.mp4',
      titleKey: 'videos.video1',
    },
    {
      id: 2,
      src: '/videos/carousellevideo2.mp4',
      titleKey: 'videos.video2',
    },
    {
      id: 3,
      src: '/videos/carousellevideo3.mp4',
      titleKey: 'videos.video3',
    },
    {
      id: 4,
      src: '/videos/carousellevideo4.mp4',
      titleKey: 'videos.video4',
    }
  ];

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Play the current video when it becomes active
    if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex]?.play().catch(() => {
        // Handle autoplay restrictions
      });
    }

    // Pause other videos
    videoRefs.current.forEach((video, index) => {
      if (index !== currentIndex && video) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;

    setIsAnimating(true);
    const direction = index > currentIndex ? 1 : -1;

    gsap.to(carouselRef.current, {
      x: direction * 50,
      opacity: 0.5,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentIndex(index);
        gsap.fromTo(
          carouselRef.current,
          { x: -direction * 50, opacity: 0.5 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % videos.length;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    goToSlide(prevIndex);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  return (
    <section className="bg-white py-4 md:py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-playfair">
            {t('title')}
          </h2>
          <p className="text-gray-800 text-lg md:text-xl max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Video Display */}
          <div
            ref={carouselRef}
            className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] rounded-2xl overflow-hidden shadow-2xl"
          >
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  className="w-full h-full object-cover md:object-none"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <h3 className="text-white text-2xl md:text-3xl font-bold font-playfair">
                    {t(video.titleKey)}
                  </h3>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[#c26d4c] hover:bg-[#a05a3d] disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#c26d4c] hover:bg-[#a05a3d] disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Next video"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'bg-[#c26d4c] w-12 h-3'
                    : 'bg-gray-500 w-3 h-3 hover:bg-gray-400'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-12">
            <Link
              href="/contact"
              className="bg-[#c26d4c] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#a05a3d] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel;
