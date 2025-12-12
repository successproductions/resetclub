'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MasterClassCalendar() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8)); 
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
    router.push('/master-class/whatsapp-join');
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

  // Event dates (28th, 29th, 30th of September)
  const eventDates = [28, 30];

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="relative bg-black min-h-screen flex flex-col items-center px-4 py-5 md:pb-6 font-graphik">
      <div ref={contentRef} className="w-full max-w-5xl mx-auto">
        {/* Logo - Using Nahed Image */}
        <div className="flex justify-center mb-1">
          <div className="relative w-48 h-28 md:w-64 md:h-32">
            <Image
              src="/images/master/MASTERCLASSLOGO2.png"
              alt="Nahed Rachad"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Live Event Badge */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-2 bg-[#00ff00]/10 border border-gray-300 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-[#00ff00] rounded-full animate-pulse"></span>
            <span className="text-gray-100 text-sm md:text-base font-normal uppercase tracking-wider">
              ÉVÉNEMENT VIRTUEL LIVE: 28 et 30 septembre
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl md:text-5xl font-medium text-white text-center mb-3">
          Ajoutez les <span className="text-[#cbb9a7]">Dates de l'événement</span> à votre calendrier
        </h1>

        {/* Calendar */}
        <div className="bg-[#0a0a0a] rounded-2xl p-6 md:py-4 md:px-6 border border-gray-800 shadow-2xl mb-8">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl md:text-2xl font-semibold capitalize">
              {monthName}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={goToPreviousMonth}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Sep
              </button>
              <button
                onClick={goToNextMonth}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Oct
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-gray-500 text-center text-sm font-medium py-2">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square"></div>
            ))}

            {/* Calendar Days */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const isEventDay = eventDates.includes(day);

              return (
                <div
                  key={day}
                  className={`${isEventDay ? 'col-span-2 md:col-span-1 min-h-[110px] md:min-h-[120px]' : 'aspect-square'} border border-gray-800 rounded-lg p-1 md:p-2 flex flex-col items-start justify-start ${
                    isEventDay ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-transparent'
                  }`}
                >
                  <span className="text-white text-xs md:text-base mb-1">{day}</span>
                  {isEventDay && (
                    <div className="mt-auto w-full space-y-0.5 md:space-y-1">
                      <div className="bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] text-white text-[9px] md:text-[10px] px-1.5 md:px-2 py-1 rounded text-center font-semibold">
                        General
                      </div>
                      <div className="bg-white text-black text-[8px] md:text-[9px] px-1 py-0.5 rounded text-center font-medium">
                        1 PM EST
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

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
