'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';

export default function NotificationWidget() {
  const t = useTranslations('NotificationWidget');
  const [isVisible, setIsVisible] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Show notification after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && notificationRef.current) {
      // Check if desktop or mobile
      const isDesktop = window.innerWidth >= 768;

      // Create GSAP timeline for entrance animation
      const tl = gsap.timeline();

      tl.fromTo(
        notificationRef.current,
        {
          x: isDesktop ? 400 : -400,
          opacity: 0,
          scale: 0.8,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        }
      );

      // Add a subtle bounce effect
      tl.to(notificationRef.current, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out',
      }).to(notificationRef.current, {
        y: 0,
        duration: 0.3,
        ease: 'bounce.out',
      });

      timelineRef.current = tl;
    }
  }, [isVisible]);

  const handleClose = () => {
    if (notificationRef.current) {
      const isDesktop = window.innerWidth >= 768;
      gsap.to(notificationRef.current, {
        x: isDesktop ? 400 : -400,
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: 'back.in(1.7)',
        onComplete: () => setIsVisible(false),
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={notificationRef}
      className="fixed top-20 left-4 md:left-auto md:right-4 z-50"
      style={{ opacity: 0 }}
    >
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-6 py-4 flex items-center gap-4 max-w-md relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Avatar/Image */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
              alt="Client"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <p className="text-gray-700 text-base font-graphik font-medium leading-relaxed">
            {t('message')}
          </p>
          <p className="text-gray-500 text-sm mt-1 uppercase tracking-wider font-light">
            {t('brand')}
          </p>
        </div>
      </div>
    </div>
  );
}
