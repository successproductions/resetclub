'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import Image from 'next/image';

export default function MasterClassConfirmationUltimate() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 }
        );
      }

      // Animate progress bar
      if (progressBarRef.current && progressTextRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { width: '0%' },
          { 
            width: '100%', 
            duration: 1.5, 
            ease: 'power2.out',
            delay: 0.3
          }
        );
        
        // Animate counter from 0 to 100
        gsap.fromTo(
          progressTextRef.current,
          { innerText: 0 },
          {
            innerText: 100,
            duration: 1.5,
            ease: 'power2.out',
            delay: 0.3,
            snap: { innerText: 1 },
            onUpdate: function() {
              if (progressTextRef.current) {
                progressTextRef.current.innerText = Math.round(Number(progressTextRef.current.innerText)) + '%';
              }
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleWhatsAppJoin = () => {
    // Navigate to WhatsApp join page
    router.push('/master-class/whatsapp-join');
  };

  return (
    <div className="relative bg-black min-h-screen flex flex-col items-center px-4 py-5 md:py-10 font-graphik">
      <div ref={contentRef} className="w-full max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="relative w-48 h-20 md:w-64 md:h-24">
            <Image
              src="/images/master/MASTERCLASSLOGO2.png"
              alt="Masterclass Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-6">
          <div className="relative w-full h-5 bg-gray-800 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#51b1aa] to-[#91dbd3]"
              style={{ width: '0%' }}
            >
              <div 
                ref={progressTextRef}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold"
              >
                0%
              </div>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl md:text-4xl font-medium text-white text-center mb-3">
          Félicitations ! 🎉
        </h1>

        <h2 className="text-xl md:text-3xl font-medium text-[#51b1aa] text-center mb-6">
          Ton accès RESET 360™ est confirmé
        </h2>

        {/* Confirmation Message */}
        <div className="mb-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-[#51b1aa] rounded-full mb-4">
              <span className="text-4xl md:text-5xl">📧</span>
            </div>
            
            <p className="text-white text-lg md:text-xl mb-4 text-center">
              Tu vas recevoir un <span className="text-[#51b1aa] font-semibold">email de confirmation</span> avec:
            </p>

            <ul className="text-center max-w-2xl mx-auto space-y-3 text-white text-base md:text-lg">
              <li className="flex items-center justify-center gap-3">
                <span className="text-[#51b1aa] text-xl flex-shrink-0">✓</span>
                <span>Tes identifiants de connexion à la plateforme RESET 360™</span>
              </li>
              <li className="flex items-center justify-center gap-3">
                <span className="text-[#51b1aa] text-xl flex-shrink-0">✓</span>
                <span>Le lien direct pour accéder à ton espace membre</span>
              </li>
              <li className="flex items-center justify-center gap-3">
                <span className="text-[#51b1aa] text-xl flex-shrink-0">✓</span>
                <span>Toutes les instructions pour démarrer ton parcours</span>
              </li>
            </ul>

            <div className="mt-6 p-4">
              <p className="text-white text-sm md:text-base text-center">
                <span className="font-semibold">📬 Vérifie ta boîte mail dans les prochaines minutes</span>
                <br />
                (N&apos;oublie pas de checker tes spams si besoin)
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Section */}
        <div className="bg-gradient-to-br from-[#1a4d47] to-[#0d2623] rounded-3xl p-5 md:p-8 border-2 border-[#51b1aa] shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-3">
            {/* Left Side - Text */}
            <div className="flex-1 text-left">
              <h2 className="text-2xl! md:text-3xl! font-medium text-white mb-1">
                Rejoins le Groupe WhatsApp Privé
              </h2>

              <p className="text-white text-sm md:text-base mb-3">
                En attendant ton email, rejoins notre groupe pour :
              </p>

              <ul className="space-y-1 text-white font-medium text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-lg flex-shrink-0">✔</span>
                  <span>Accéder à la Masterclass immédiatement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-lg flex-shrink-0">✔</span>
                  <span>Recevoir le workbook offert</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-lg flex-shrink-0">✔</span>
                  <span>Obtenir un support prioritaire</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-lg flex-shrink-0">✔</span>
                  <span>Accéder aux bonus exclusifs membres 360</span>
                </li>
              </ul>
            </div>

            {/* Right Side - Button */}
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={handleWhatsAppJoin}
                className="bg-gradient-to-r from-[#cbb9a7] to-[#d4c4b3] hover:from-[#d4c4b3] hover:to-[#cbb9a7] text-black font-medium text-base md:text-lg py-4 px-8 md:px-12 rounded-lg transition-all duration-300 hover:scale-105 uppercase shadow-xl whitespace-nowrap"
              >
                REJOINDRE MAINTENANT
              </button>

              <p className="text-gray-300 text-xs md:text-sm text-center mt-4 max-w-xs">
                C&apos;est par là que tout commence ! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
