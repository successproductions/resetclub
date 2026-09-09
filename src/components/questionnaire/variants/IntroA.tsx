'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { INTRO, DUREE_ESTIMEE_MINUTES, NB_ITEMS_TOTAL } from '@/lib/questionnaire/questions';
import { IMAGES } from '@/lib/questionnaire/theme';
import { monterTimeline } from './anim';

const ETAPES = [
  { n: '01', t: 'Votre contexte', d: 'Âge, sommeil, activité, hydratation.' },
  { n: '02', t: 'Vos ressentis', d: 'Circulation, récupération, énergie, digestion.' },
  { n: '03', t: 'Votre priorité', d: 'Ce que vous voudriez changer en premier.' },
];

/** Variante A — éditorial : l'image est cadrée, pas envahissante. */
export default function IntroA({ onStart }: { onStart: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => monterTimeline(root, 'rc-a'), []);

  return (
    <div
      ref={root}
      className="grid min-h-[100dvh] items-center gap-10 bg-[#FBF8F4] px-6 py-14 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-16"
    >
      <div className="mx-auto w-full max-w-xl lg:mx-0">
        <p className="rc-a text-[11px] font-medium uppercase tracking-[0.3em] text-[#51B1AA]">
          Reset Club™ · Questionnaire Profil
        </p>

        <h1 className="rc-a mt-6 text-[#0D2623]">
          Comprendre comment
          <br />
          votre corps fonctionne
          <br />
          <span className="italic text-[#2D6D68]">aujourd’hui.</span>
        </h1>

        <p className="rc-a mt-7 max-w-lg text-[15px] leading-relaxed text-[#5B5148] sm:text-base">
          {INTRO.paragraphes[0]}
        </p>

        <div className="rc-a mt-9 space-y-px overflow-hidden rounded-2xl border border-[#E7DFD6] bg-white">
          {ETAPES.map((e) => (
            <div key={e.n} className="flex gap-5 border-b border-[#F0EAE2] px-6 py-4 last:border-0">
              <span className="pt-[3px] text-[11px] font-medium tracking-[0.14em] text-[#CBB9A7]">
                {e.n}
              </span>
              <div>
                <p className="text-[14.5px] font-medium text-[#0D2623]">{e.t}</p>
                <p className="mt-0.5 text-[13px] text-[#7B7066]">{e.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rc-a mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <button
            type="button"
            onClick={onStart}
            className="group inline-flex items-center gap-3 rounded-full bg-[#0D2623] px-8 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:bg-[#1A4D47]"
          >
            Commencer
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <p className="text-[13px] text-[#7B7066]">
            {DUREE_ESTIMEE_MINUTES} minutes · {NB_ITEMS_TOTAL} questions
          </p>
        </div>

        <p className="rc-a mt-8 border-l-2 border-[#CBB9A7] pl-4 text-[12.5px] leading-relaxed text-[#7B7066]">
          {INTRO.cadre}
        </p>
      </div>

      <div className="rc-a relative hidden h-[78vh] overflow-hidden rounded-[36px] lg:block">
        <Image src={IMAGES.intro} alt="" fill sizes="42vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2623]/45 to-transparent" />
      </div>
    </div>
  );
}
