'use client';

import { useState } from 'react';
import Image from 'next/image';
import MembershipApplicationForm from '@/components/ui/MembershipApplicationForm';

export default function MembershipCTA() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <MembershipApplicationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    <section id="membership-cta" className="relative min-h-[70vh] md:min-h-screen  flex flex-col bg-white overflow-hidden">
      {/* Background Orb Image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[350px] h-[350px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px]">
          <Image
            src="/images/orberesetclub.png"
            alt="Reset Club"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-3xl md:max-w-4xl mt-24 md:mt-0">
          <p className="text-[12px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-white mb-4 md:mb-6 font-graphik">
            EXPERIENCE A NEW STANDARD IN WELLNESS.
          </p>

          <h3 className="text-lg md:text-3xl lg:text-4xl! text-white font-light font-graphik leading-relaxed mb-1 md:mb-8">
            L&apos;adhésion est limitée et offerte sur invitation uniquement.
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            Demandez une invitation pour commencer votre parcours Reset Club.
          </h3>

          <button
            onClick={() => setIsFormOpen(true)}
            className="px-2 py-2 md:px-6 md:py-3 text-sm! md:text-lg! border border-white text-white font-medium font-graphik uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black mt-4 md:mt-6"
          >
            Je réserve mon bilan
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-6 md:px-12 py-8 flex items-center justify-between border-t border-white/10">

       {/* Center - Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="relative w-24 h-18 md:w-40 lg:w-44 lg:h-20 md:h-14">
            <Image
              src="/images/LOGORESETCLUBNOIR.png"
              alt="Reset Club"
              fill
              className="object-contain"
            />
          </div>
        </div>
        {/* Left - Location */}
        <div className="text-black text-sm font-graphik">
          Rabat
        </div>



        {/* Right - Social */}
        <div className="text-black text-sm font-graphik">
          @ResetClub
        </div>
      </div>
    </section>
    </>
  );
}
