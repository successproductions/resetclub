'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import Image from 'next/image';

export default function MasterClassConfirmation2() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

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
    });

    return () => ctx.revert();
  }, []);

  const handleWhatsAppJoin = () => {
    // Navigate to WhatsApp join page
    router.push('/master-class/whatsapp-join');
  };

  return (
    <div className="relative bg-black min-h-screen flex flex-col items-center  px-4 py-5 md:py-10 font-graphik">
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
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] transition-all duration-500"
              style={{ width: '100%' }}
            >
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold">
                100%
              </div>
            </div>
          </div>
          
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl md:text-4xl font-medium text-white text-center mb-2">
          Merci ! Ton paiement a été confirmé 🎉
        </h1>

        <p className="text-white text-center text-lg md:text-xl mb-6">
          Bilal prépare ton bilan personnalisé et te contactera dans les 24-48 heures.
        </p>

        {/* WhatsApp Section */}
        <div className="bg-gradient-to-br from-[#1a4d47] to-[#0d2623] rounded-3xl p-5 md:p-8 border-2 border-[#51b1aa] shadow-2xl mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-3">
            {/* Left Side - Text */}
            <div className="flex-1 text-left">
              <h2 className="text-2xl! md:text-3xl! font-medium text-white mb-1">
                Rejoins le Groupe WhatsApp Privé
              </h2>

              <p className="text-white text-sm md:text-base">
                C&apos;est dans ce groupe que tu recevras :
              </p>

              <ul className="mt-1 space-y-0 text-white font-medium text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-lg flex-shrink-0">✔</span>
                  <span>Le lien d&apos;accès à la Masterclass</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-lg flex-shrink-0">✔</span>
                  <span>Le workbook offert</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-lg flex-shrink-0">✔</span>
                  <span>Les rappels et les détails importants</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-lg flex-shrink-0">✔</span>
                  <span>Les bonus réservés aux participantes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-lg flex-shrink-0">✔</span>
                  <span>Les infos en avant-première</span>
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
                Tu n&apos;as pas WhatsApp ? Télécharge-le maintenant.
                <br />
                C&apos;est essentiel pour recevoir tous les accès.
              </p>
            </div>
          </div>
        </div>

        {/* Reset 360 Upsell Section */}
        <div className="bg-gradient-to-br from-[#1a4d47] to-[#0d2623] rounded-3xl p-5 md:p-8 border-2 border-[#51b1aa] shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-3">
            {/* Left Side - Text */}
            <div className="flex-1 text-left">
              <h2 className="text-2xl! md:text-3xl! font-medium text-white mb-3">
                Prêt(e) à aller encore plus loin ?
              </h2>

              <p className="text-white text-base md:text-lg mb-4">
                Découvre le programme <span className="text-[#cbb9a7] font-semibold">RESET 360™</span> — La transformation complète pour ton corps et ton esprit.
              </p>

              <ul className="space-y-2 text-white font-medium text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-[#cbb9a7] text-lg flex-shrink-0">👑</span>
                  <span>Programme complet de biohacking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#cbb9a7] text-lg flex-shrink-0">👑</span>
                  <span>Suivi personnalisé avec notre équipe</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#cbb9a7] text-lg flex-shrink-0">👑</span>
                  <span>Accès exclusif aux outils avancés</span>
                </li>
              </ul>
            </div>

            {/* Right Side - Button */}
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={() => router.push('/master-class/step-3')}
                className="bg-gradient-to-r from-[#cbb9a7] to-[#d4c4b3] hover:from-[#d4c4b3] hover:to-[#cbb9a7] text-black font-medium text-base md:text-lg py-4 px-8 md:px-12 rounded-lg transition-all duration-300 hover:scale-105 uppercase shadow-xl whitespace-nowrap"
              >
                DÉCOUVRIR RESET 360
              </button>

              <p className="text-gray-300 text-xs md:text-sm text-center mt-4 max-w-xs">
                Offre exclusive pour les membres VIP
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
