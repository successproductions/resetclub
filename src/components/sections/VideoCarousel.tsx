'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Image from 'next/image';

const VideoCarousel: React.FC = () => {
  const t = useTranslations('VideoCarousel');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState<boolean[]>([false, false, false, false]);

  const videos = [
    {
      id: 1,
      src: '/videos/carousellevideo1.mp4',
      titleKey: 'videos.video1',
      thumbnail: '/images/thumbail1.png',
      mobileThumbnail: '/images/thumbail1mobile.png',
    },
    {
      id: 2,
      src: '/videos/carousellevideo2.mp4',
      titleKey: 'videos.video2',
      thumbnail: '/images/thumbail2.png',
      mobileThumbnail: '/images/thumbail2mobile.png',
    },
    {
      id: 3,
      src: '/videos/carousellevideo3.mp4',
      titleKey: 'videos.video3',
      thumbnail: '/images/thumbail5.png',
      mobileThumbnail: '/images/thumbail5mobile.png',
    },
    {
      id: 4,
      src: '/videos/carousellevideo4.mp4',
      titleKey: 'videos.video4',
      thumbnail: '/images/thumbail4.png',
      mobileThumbnail: '/images/thumbail4mobile.png',
    }
  ];

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleThumbnailClick = (index: number) => {
    const newIsPlaying = [...isPlaying];
    newIsPlaying[index] = true;
    setIsPlaying(newIsPlaying);

    if (videoRefs.current[index]) {
      videoRefs.current[index]?.play().catch(() => {
        // Handle autoplay restrictions
      });
    }
  };

  const handleVideoPause = (index: number) => {
    const newIsPlaying = [...isPlaying];
    newIsPlaying[index] = false;
    setIsPlaying(newIsPlaying);
  };

  useEffect(() => {
    // When changing slides, pause all videos and reset playing state
    videoRefs.current.forEach((video, index) => {
      if (index !== currentIndex && video) {
        video.pause();
        video.currentTime = 0;
      }
    });

    const newIsPlaying = [...isPlaying];
    newIsPlaying[currentIndex] = false;
    setIsPlaying(newIsPlaying);
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

  // Removed auto-advance carousel - user controls via thumbnails

  return (
    <section className="bg-gray-50 py-4 md:py-10 overflow-hidden">
      <div className="md:max-w-7xl md:mx-auto md:px-6">
        {/* Section Title */}
        <div className="md:text-center mb-5 md:mb-6 px-6 md:px-0">
          <h2 className="text-3xl md:text-4xl font-normal lg:text-5xl text-[#524029] mb-1 md:mb-4">
            {t('title')}
          </h2>
          <p className="text-[#524029] text-lg md:text-xl max-w-3xl font-graphik mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Video Display - Full Width on Mobile */}
          <div
            ref={carouselRef}
            className="relative w-full h-[500px] md:h-[700px] lg:h-[760px] overflow-hidden md:shadow-2xl"
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
                  className="w-full h-full object-contain md:object-cover"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  onPause={() => handleVideoPause(index)}
                  controls={isPlaying[index]}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Thumbnail Overlay - shown when video is not playing */}
                {!isPlaying[index] && (
                  <button
                    onClick={() => handleThumbnailClick(index)}
                    className="absolute inset-0 z-20 cursor-pointer group"
                    aria-label={`Play ${t(video.titleKey)}`}
                  >
                    {/* Mobile Thumbnail */}
                    <Image
                      src={video.mobileThumbnail}
                      alt={t(video.titleKey)}
                      fill
                      className="block md:hidden object-contain w-full h-full"
                      sizes="100vw"
                      priority={index === 0}
                    />
                    {/* Desktop Thumbnail */}
                    <Image
                      src={video.thumbnail}
                      alt={t(video.titleKey)}
                      fill
                      className="hidden md:block object-cover w-full h-full"
                      sizes="100vw"
                      priority={index === 0}
                    />
                  </button>
                )}
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="absolute  md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white/60 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white/60 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Next video"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8 px-6 md:px-0">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'bg-[#524029] w-12 h-3'
                    : 'bg-gray-500 w-3 h-3 hover:bg-gray-400'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-6 px-6 md:px-0">
            <Link
              href="/payment"
              className="bg-transparent text-[#524029] px-4 md:px-8 py-4 font-graphik font-medium text-lg border hover:bg-gray-950 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
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
