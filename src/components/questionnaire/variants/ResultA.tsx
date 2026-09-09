'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { ResultatComplet } from '@/types/questionnaire';
import { FORMULATION_PROFIL, TITRE_PROFIL } from '@/lib/questionnaire/copy';
import ProfileAvatar, { NUANCE } from '../ProfileAvatar';
import ResultBody from './ResultBody';
import { revelerSections } from './reveal';

/** Variante A — bandeau teinté puis colonne unique. Sobre, proche d'un document. */
export default function ResultA({
  resultat,
  prenom,
}: {
  resultat: ResultatComplet;
  prenom: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const dominant = resultat.classement[0].profil;
  const ouvrant = resultat.profil_ouvrant;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const monte = (c: string, d: gsap.TweenVars, v: gsap.TweenVars) =>
        gsap.fromTo(c, { opacity: 0, ...d }, { opacity: 1, y: 0, scale: 1, ...v });
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.add(monte('.rc-ra-avatar', { scale: 0.75 }, { duration: 0.8, ease: 'back.out(1.4)' }))
        .add(monte('.rc-ra-txt', { y: 18 }, { duration: 0.6, stagger: 0.1 }), 0.2);
      revelerSections();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-[100dvh] bg-[#FBF8F4]">
      <header
        className="relative overflow-hidden px-6 pb-14 pt-16 sm:px-10 sm:pb-16 sm:pt-20"
        style={{
          background: `linear-gradient(135deg, ${NUANCE[dominant].de}22, ${NUANCE[dominant].a}14), #FFFFFF`,
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{
            background: `linear-gradient(90deg, ${NUANCE[dominant].de}, ${NUANCE[dominant].a})`,
          }}
        />
        <div className="mx-auto flex max-w-xl flex-col items-start gap-7 sm:flex-row sm:items-center sm:gap-9">
          <div className="rc-ra-avatar shrink-0">
            <ProfileAvatar profil={dominant} taille={116} />
          </div>
          <div>
            <p
              className="rc-ra-txt text-[11px] font-medium uppercase tracking-[0.24em]"
              style={{ color: NUANCE[dominant].a }}
            >
              Merci {prenom} · votre orientation
            </p>
            <h1 className="rc-ra-txt mt-3 text-[#0D2623]">{TITRE_PROFIL[dominant]}</h1>
            <p className="rc-ra-txt mt-4 text-[15.5px] leading-relaxed text-[#1A4D47]">
              {FORMULATION_PROFIL[dominant]}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-xl px-5 pb-28 pt-14 sm:px-8">
        <ResultBody resultat={resultat} dominant={dominant} ouvrant={ouvrant} />
      </div>
    </div>
  );
}
