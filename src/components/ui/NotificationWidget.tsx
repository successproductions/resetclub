'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';

interface NotificationData {
  image: string;
  messageKey: string;
  brandKey: string;
}

export default function NotificationWidget() {
  const t = useTranslations('NotificationWidget');
  const [visibleNotifications, setVisibleNotifications] = useState<number[]>([]);
  const notification1Ref = useRef<HTMLDivElement>(null);
  const notification2Ref = useRef<HTMLDivElement>(null);
  const animatedNotifications = useRef<Set<number>>(new Set());

  // Define notifications with different images and translation keys
  const notifications: NotificationData[] = [
    {
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      messageKey: 'message1',
      brandKey: 'brand',
    },
    {
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      messageKey: 'message2',
      brandKey: 'brand',
    },
  ];

  useEffect(() => {
    // Show first notification after 5 seconds
    const timer1 = setTimeout(() => {
      setVisibleNotifications((prev) => [...prev, 0]);
    }, 5000);

    // Show second notification after 2 minutes (120000ms)
    const timer2 = setTimeout(() => {
      setVisibleNotifications((prev) => [...prev, 1]);
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    // Animate first notification when it appears (only once)
    if (visibleNotifications.includes(0) && notification1Ref.current && !animatedNotifications.current.has(0)) {
      animatedNotifications.current.add(0);
      const isDesktop = window.innerWidth >= 768;
      const tl = gsap.timeline();

      tl.fromTo(
        notification1Ref.current,
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

      tl.to(notification1Ref.current, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out',
      }).to(notification1Ref.current, {
        y: 0,
        duration: 0.3,
        ease: 'bounce.out',
      });
    }
  }, [visibleNotifications]);

  useEffect(() => {
    // Animate second notification when it appears (only once)
    if (visibleNotifications.includes(1) && notification2Ref.current && !animatedNotifications.current.has(1)) {
      animatedNotifications.current.add(1);
      const isDesktop = window.innerWidth >= 768;
      const tl = gsap.timeline();

      tl.fromTo(
        notification2Ref.current,
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

      tl.to(notification2Ref.current, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out',
      }).to(notification2Ref.current, {
        y: 0,
        duration: 0.3,
        ease: 'bounce.out',
      });
    }
  }, [visibleNotifications]);

  const handleClose = (index: number, ref: React.RefObject<HTMLDivElement | null>) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (ref.current) {
      const isDesktop = window.innerWidth >= 768;
      gsap.to(ref.current, {
        x: isDesktop ? 400 : -400,
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: 'back.in(1.7)',
        onComplete: () => {
          setVisibleNotifications((prev) => prev.filter((n) => n !== index));
        },
      });
    }
  };

  const renderNotification = (index: number, ref: React.RefObject<HTMLDivElement | null>) => {
    if (!visibleNotifications.includes(index)) return null;

    const notification = notifications[index];
    const topPosition = index === 0 ? 'top-20' : 'top-44';

    return (
      <div
        key={index}
        ref={ref}
        className={`fixed ${topPosition} left-4 md:left-auto md:right-4 z-50`}
        style={{ opacity: 0 }}
      >
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-6 py-4 flex items-center gap-4 max-w-md relative">
          {/* Close button */}
          <button
            onClick={handleClose(index, ref)}
            className="absolute -top-2 -right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          {/* Avatar/Image */}
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100">
              <img
                src={notification.image}
                alt="Client"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <p className="text-gray-700 text-base font-graphik font-medium leading-relaxed">
              {t(notification.messageKey)}
            </p>
            <p className="text-gray-500 text-sm mt-1 uppercase tracking-wider font-light">
              {t(notification.brandKey)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderNotification(0, notification1Ref)}
      {renderNotification(1, notification2Ref)}
    </>
  );
}
