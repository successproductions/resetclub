'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Ticket } from 'lucide-react';
import MasterClassPopup from '@/components/ui/MasterClassPopup';

export default function MasterClassPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate image first
      tl.fromTo(
        imageRef.current,
        { opacity: 0, y: -50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1 }
      );

      // Then animate badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );

      // Animate headline
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.2'
      );

      // Animate description
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );

      // Animate button with scale effect
      tl.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8 },
        '-=0.2'
      );

      // Add continuous pulse animation to button
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
      });
    });

    return () => ctx.revert();
  }, []);
  return (
    <main className="relative h-screen bg-black overflow-hidden font-graphik">

      <section className="relative h-screen flex flex-col">
        {/* Background Image - Rounded pattern */}
        <div className="absolute top-0 left-0 w-full h-[calc(70vh-220px)]  md:h-[calc(65vh-220px)] z-0">
          <Image
            src="/images/master/SCREAN.png"
            alt="Background pattern"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Container */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-end px-4 md:px-8 pb-[220px]">
          <div className="max-w-5xl mx-auto text-center">
            {/* ND Image - Positioned at bottom */}
            <div ref={imageRef} className="relative w-full max-w-2xl mx-auto mt-24 md:mt-54">
              <div className="relative w-full aspect-square h-[300px] md:aspect-auto md:h-[450px]">
                <Image
                  src="/images/master/NAHED.png"
                  alt="Nahed Rachad"
                  fill
                  className="object-contain"
                  priority
                />

                {/* Logo positioned absolutely at bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 md:w-40 md:h-20">
                  <Image
                    src="/images/master/NRLOGO.png"
                    alt="NR Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Event Badge */}
            <div ref={badgeRef} className="inline-flex items-center gap-2 bg-[#00ff00]/10 border border-gray-300 px-4 py-1 rounded-full mb-2">
              <span className="w-2 h-2 bg-[#00ff00] rounded-full animate-pulse"></span>
              <span className="text-gray-100 text-sm md:text-base font-normal uppercase tracking-wider">
                Événement Virtuel en Direct
              </span>
            </div>

            {/* Main Heading */}
            <h1 ref={headlineRef} className="text-2xl md:text-3xl lg:text-4xl font-medium font-graphik text-white mb-1 ">
              <span className="block md:mb-1">Transformez Votre</span>
              <span className="text-[#cbb9a7]">Santé & Bien-être</span>
              <span className="block md:mt-1">en 3 Jours</span>
            </h1>
            <p ref={descRef} className="text-xs md:text-lg text-white mb-2 max-w-2xl mx-auto">
              Aucune expérience requise. Aucun engagement. Suivez simplement le système et transformez-vous.
            </p>

            {/* CTA Button */}
            <div className="relative inline-block">
              {/* Animated yellow border */}
              <div className="absolute -inset-1 bg-[#f7ff00] rounded-full animate-border-pulse"></div>

              {/* Black border layer */}
              <div className="absolute -inset-0.5 bg-black rounded-full"></div>

              {/* Main button */}
              <button
                ref={buttonRef}
                onClick={() => setIsPopupOpen(true)}
                className="relative inline-flex items-center gap-2 md:gap-3 bg-[#f7ff00] hover:bg-[#f7ff00] text-black font-bold text-lg md:text-xl px-4 md:px-12 py-4 md:py-5 rounded-full transition-all duration-300"
              >
                <Ticket className="w-5 h-5 md:w-6 md:h-6" />
                <span>GET MY FREE TICKET</span>
              </button>
            </div>

            <p className="text-sm text-gray-300 mt-4">
              *Tickets Are First Come, First Served
            </p>
          </div>
        </div>

        {/* Bottom Wave SVG - Fixed at bottom */}
        <div className="absolute bottom-0 left-0 w-full z-10 h-[200px]">
          <Image
            src="https://framerusercontent.com/images/fX4qDtjEx58RDMEQ2paoAsRYtqI.svg?width=1440&height=220"
            alt="Wave decoration"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Master Class Popup */}
      <MasterClassPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </main>
  );
}
