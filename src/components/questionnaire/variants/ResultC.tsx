'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { ResultatComplet } from '@/types/questionnaire';
import { FORMULATION_PROFIL, TITRE_PROFIL } from '@/lib/questionnaire/copy';
import ProfileAvatar, { NUANCE } from '../ProfileAvatar';
import ResultBody from './ResultBody';
import { revelerSections } from './reveal';

/**
 * Variante C — colonne fixe à gauche, rapport qui défile à droite.
 * Le terrain reste sous les yeux pendant toute la lecture.
 */
export default function ResultC({
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
      tl.add(monte('.rc-rc-avatar', { scale: 0.7 }, { duration: 0.9, ease: 'back.out(1.5)' }))
        .add(monte('.rc-rc-txt', { y: 20 }, { duration: 0.65, stagger: 0.1 }), 0.25);
      revelerSections();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-[100dvh] bg-[#FBF8F4] lg:grid lg:grid-cols-[0.85fr_1.15fr]">
      <aside
        className="relative flex items-center overflow-hidden px-6 py-16 sm:px-10 lg:sticky lg:top-0 lg:h-[100dvh] lg:py-0"
        style={{
          background: `linear-gradient(160deg, #0D2623, ${NUANCE[dominant].a})`,
        }}
      >
        <div
          className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full blur-[110px]"
          style={{ background: NUANCE[dominant].de, opacity: 0.3 }}
        />
        <div className="relative mx-auto w-full max-w-sm text-center lg:text-left">
          <div className="rc-rc-avatar mx-auto w-fit lg:mx-0">
            <ProfileAvatar profil={dominant} taille={128} />
          </div>
          <p className="rc-rc-txt mt-9 text-[11px] font-medium uppercase tracking-[0.24em] text-[#91DBD3]">
            Merci {prenom} · votre orientation
          </p>
          <h1 className="rc-rc-txt mt-4 text-white">{TITRE_PROFIL[dominant]}</h1>
          <p className="rc-rc-txt mt-5 text-[15.5px] leading-relaxed text-white/80">
            {FORMULATION_PROFIL[dominant]}
          </p>
        </div>
      </aside>

      <div className="mx-auto w-full max-w-xl px-5 pb-28 pt-14 sm:px-8 lg:pt-24">
        <ResultBody resultat={resultat} dominant={dominant} ouvrant={ouvrant} />
      </div>
    </div>
  );
}
