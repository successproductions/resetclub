'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Clock3, Lock, ListChecks } from 'lucide-react';
import { INTRO, DUREE_ESTIMEE_MINUTES, NB_ITEMS_TOTAL } from '@/lib/questionnaire/questions';
import { IMAGES } from '@/lib/questionnaire/theme';
import { monterTimeline } from './anim';

/**
 * Variante C — carte posée sur une image floutée : la photo n'est plus qu'une
 * matière colorée, donc elle reste élégante quel que soit le visuel choisi.
 */
export default function IntroC({ onStart }: { onStart: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => monterTimeline(root, 'rc-c'), []);

  return (
    <div ref={root} className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-5 py-14 sm:px-8">
      <Image src={IMAGES.intro} alt="" fill sizes="100vw" priority className="object-cover" />
      <div className="absolute inset-0 backdrop-blur-[26px]" />
      <div className="absolute inset-0 bg-[#0D2623]/58" />

      <div className="rc-c relative w-full max-w-xl rounded-[34px] border border-white/22 bg-white/94 px-8 py-12 shadow-[0_40px_100px_-40px_rgba(13,38,35,0.6)] sm:px-12">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.3em] text-[#51B1AA]">
          Reset Club™
        </p>

        <h1 className="mt-6 text-center text-[#0D2623]">Questionnaire Profil</h1>

        <p className="mx-auto mt-6 max-w-md text-center text-[15px] leading-relaxed text-[#5B5148]">
          {INTRO.paragraphes[0]}
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-2.5">
          {[
            { i: Clock3, t: `${DUREE_ESTIMEE_MINUTES} minutes` },
            { i: ListChecks, t: `${NB_ITEMS_TOTAL} questions` },
            { i: Lock, t: 'Confidentiel' },
          ].map(({ i: Icone, t }) => (
            <span
              key={t}
              className="inline-flex items-center gap-2 rounded-full border border-[#E7DFD6] bg-[#FBF8F4] px-4 py-2 text-[13px] text-[#5B5148]"
            >
              <Icone size={14} className="text-[#51B1AA]" />
              {t}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={onStart}
          className="group mt-10 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#0D2623] px-8 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:bg-[#1A4D47]"
        >
          Commencer
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <p className="mt-8 text-center text-[12.5px] leading-relaxed text-[#7B7066]">
          {INTRO.cadre}
        </p>
      </div>
    </div>
  );
}
