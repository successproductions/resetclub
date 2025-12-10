'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Ticket, Sparkles, Mail, CheckCircle, Gift } from 'lucide-react';
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
      // tl.fromTo(
      //   buttonRef.current,
      //   { opacity: 0, scale: 0.8,  },
      //   { opacity: 1, scale: 0.8, y: 0, duration: 0.8 },
      //   '-=0.2'
      // );

      // // Add continuous pulse animation to button
      // gsap.to(buttonRef.current, {
      //   scale: 1.05,
      //   duration: 0.8,
      //   repeat: -1,
      //   yoyo: true,
      //   ease: 'sine.inOut',
      //   delay: 2
      // });
    });

    return () => ctx.revert();
  }, []);
  return (
    <main className="relative bg-black font-graphik">

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
            <div ref={imageRef} className="relative w-full max-w-2xl mx-auto mt-24 lg:mt-24 xl:mt-54">
              <div className="relative w-full aspect-square h-[300px] md:aspect-auto md:h-[450px]">
                <Image
                  src="/images/master/NAHED.png"
                  alt="Nahed Rachad"
                  fill
                  className="object-contain"
                  priority
                />

                {/* Logo positioned absolutely at bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-50 h-24 md:w-64 md:h-40">
                  <Image
                    src="/images/master/MASTERCLASSLOGO2.png"
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
                 LIVE VIRTUAL EVENT : [DATE] — 1 JOURNÉE EXCEPTIONNELLE
              </span>
            </div>

            {/* Main Heading */}
            <h1 ref={headlineRef} className="text-2xl md:text-3xl lg:text-4xl font-medium font-graphik text-white mb-1 ">
              <span className="block md:mb-1">Une journée pour découvrir </span>
              <span className="text-[#cbb9a7]">les méthodes inédites du biohacking</span>
              <span className="block md:mt-1">féminin…</span>
            </h1>
            <p ref={descRef} className="text-xs md:text-lg text-white mb-2 max-w-2xl mx-auto">
              Et comprendre ce qui bloque réellement ton énergie, ton métabolisme et ta silhouette.
            </p>

            {/* CTA Button */}
            <div className="relative inline-block mt-2">
              {/* Animated yellow border */}
              <div className="absolute -inset-1 bg-[#51b1aa] rounded-full animate-border-pulse"></div>

              {/* Black border layer */}
              <div className="absolute -inset-0.5 bg-black rounded-full"></div>

              {/* Main button */}
              <button
                ref={buttonRef}
                onClick={() => setIsPopupOpen(true)}
                style={{
              background: 'linear-gradient(290deg, rgb(145, 219, 211) 0%, rgb(81, 177, 170) 30.2858%, rgb(145, 219, 211) 67.2878%, rgb(81, 177, 170) 100%) '
            }}
                className="relative inline-flex items-center gap-2 md:gap-3  text-white font-medium text-lg md:text-2xl! px-12 md:px-12 py-4 md:py-5 rounded-full transition-all duration-300"
              >
                <Ticket className="w-5 h-5 md:w-6 md:h-6" />
                <span>RÉSERVE TON ACCÈS GRATUIT</span>
              </button>
            </div>

            <p className="text-sm text-gray-300 mt-4">
              Places limitées premier arrivé, premier servi.
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

      {/* Info Cards Section */}
      {/* <section className="relative bg-black py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
   
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#51b1aa] to-[#91dbd3] flex items-center justify-center">
                  <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                    Une Masterclass inédite, riche, et pensée pour éveiller votre conscience corporelle.
                    <br /><br />
                    Sans jargon. Sans pression.
                    <br /><br />
                    Juste une transmission claire et puissante, menée par Nahed Rachad, pour comprendre ce que votre corps essaie de vous dire depuis des années.
                  </p>
                </div>
              </div>
            </div>

        
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#cbb9a7] to-[#d4c4b3] flex items-center justify-center relative">
                  <Mail className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    SPAM
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                    VÉRIFIE TES COURRIELS (SPAMS)
                  </h3>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    Assure toi de vérifier tes courriels, surtout les <span className="font-semibold">spams</span> et ajoute{' '}
                    <span className="font-semibold">contact@resetclub.ma</span> à tes contacts pour ne rien manquer.
                  </p>
                </div>
              </div>
            </div>

         
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#51b1aa] to-[#91dbd3] flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                    Ce que vous allez vivre :
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-base md:text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#51b1aa] flex-shrink-0">✔</span>
                      <span>Les fondements du biohacking féminin</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#51b1aa] flex-shrink-0">✔</span>
                      <span>Les erreurs qui bloquent 80% des femmes (sans qu&apos;elles le sachent)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#51b1aa] flex-shrink-0">✔</span>
                      <span>Comment relancer votre énergie naturellement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#51b1aa] flex-shrink-0">✔</span>
                      <span>Comment activer la perte de gras sans régime strict</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#51b1aa] flex-shrink-0">✔</span>
                      <span>Comment rééquilibrer stress, sommeil et hormones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#51b1aa] flex-shrink-0">✔</span>
                      <span>Comment reprendre le contrôle de votre vitalité</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

         
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#cbb9a7] to-[#d4c4b3] flex items-center justify-center">
                  <Gift className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                    Bonus offert pendant la Masterclass :
                  </h3>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium mb-2">
                    Un mini-guide exclusif :
                  </p>
                  <p className="text-gray-800 text-base md:text-lg leading-relaxed italic">
                    5 Protocoles de Biohacking pour Booster ton Énergie & Affiner ta Silhouette
                  </p>
                </div>
              </div>
            </div>
          </div>

         
          <div className="text-center">
            <div className="relative inline-block">
              
              <div className="absolute -inset-1 bg-[#51b1aa] rounded-full animate-border-pulse"></div>

             
              <div className="absolute -inset-0.5 bg-black rounded-full"></div>

             
              <button
                onClick={() => setIsPopupOpen(true)}
                style={{
                  background: 'linear-gradient(290deg, rgb(145, 219, 211) 0%, rgb(81, 177, 170) 30.2858%, rgb(145, 219, 211) 67.2878%, rgb(81, 177, 170) 100%)'
                }}
                className="relative inline-flex items-center gap-2 md:gap-3 text-white font-medium text-lg md:text-2xl px-12 md:px-16 py-4 md:py-5 rounded-full transition-all duration-300 hover:scale-105"
              >
                <Ticket className="w-5 h-5 md:w-6 md:h-6" />
                <span>RÉSERVE TON ACCÈS GRATUIT</span>
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Master Class Popup */}
      <MasterClassPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </main>
  );
}
