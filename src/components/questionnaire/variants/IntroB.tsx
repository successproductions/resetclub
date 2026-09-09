'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { INTRO, DUREE_ESTIMEE_MINUTES, NB_ITEMS_TOTAL } from '@/lib/questionnaire/questions';
import { TITRE_PROFIL } from '@/lib/questionnaire/copy';
import ProfileAvatar from '../ProfileAvatar';
import type { Profil } from '@/types/questionnaire';

const TERRAINS: Profil[] = ['DRAIN', 'CORTISOL', 'METABOLIQUE', 'DIGEST'];

/**
 * Variante B — sombre, sans photo : les quatre emblèmes annoncent d'emblée ce
 * que le questionnaire explore. Aucune dépendance à une banque d'images.
 */
export default function IntroB({ onStart }: { onStart: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const monte = (c: string, d: gsap.TweenVars, v: gsap.TweenVars) =>
        gsap.fromTo(c, { opacity: 0, ...d }, { opacity: 1, y: 0, scale: 1, ...v });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.add(monte('.rc-b-eyebrow', { y: 14 }, { duration: 0.55 }))
        .add(monte('.rc-b-title', { y: 30 }, { duration: 0.8 }), '-=0.3')
        .add(monte('.rc-b-lead', { y: 18 }, { duration: 0.6 }), '-=0.45')
        .add(monte('.rc-b-terrain', { y: 22, scale: 0.86 }, { duration: 0.65, stagger: 0.11 }), '-=0.35')
        .add(monte('.rc-b-cta', { y: 16 }, { duration: 0.55 }), '-=0.3');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#0D2623] px-6 py-16 sm:px-10 lg:px-16"
    >
      {/* Nappes de lumière : la profondeur vient de la couleur, pas d'une photo */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[60vh] w-[60vh] rounded-full bg-[#51B1AA]/16 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[55vh] w-[55vh] rounded-full bg-[#CBB9A7]/12 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-5xl">
        <p className="rc-b-eyebrow text-[11px] font-medium uppercase tracking-[0.34em] text-[#91DBD3]">
          Reset Club™ · Biohacking · Longévité
        </p>

        <h1 className="rc-b-title mt-7 max-w-3xl text-white">
          Questionnaire <span className="italic text-[#91DBD3]">Profil</span>
        </h1>

        <p className="rc-b-lead mt-7 max-w-xl text-[15px] leading-relaxed text-white/72 sm:text-[16.5px]">
          {INTRO.paragraphes[0]}
        </p>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4 sm:gap-8">
          {TERRAINS.map((t) => (
            <div key={t} className="rc-b-terrain flex flex-col items-center text-center">
              <ProfileAvatar profil={t} taille={92} />
              <p className="mt-4 text-[12px] uppercase tracking-[0.14em] text-white/70">
                {TITRE_PROFIL[t]}
              </p>
            </div>
          ))}
        </div>

        <div className="rc-b-cta mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
          <button
            type="button"
            onClick={onStart}
            className="group inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-[15px] font-medium text-[#0D2623] transition-all duration-300 hover:bg-[#91DBD3]"
          >
            Commencer
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <p className="text-[13px] text-white/55">
            {DUREE_ESTIMEE_MINUTES} minutes · {NB_ITEMS_TOTAL} questions · Confidentiel
          </p>
        </div>

        <p className="rc-b-cta mt-10 max-w-lg border-l border-[#CBB9A7]/45 pl-4 text-[12.5px] leading-relaxed text-white/45">
          {INTRO.cadre}
        </p>
      </div>
    </div>
  );
}
