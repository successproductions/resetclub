'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { Profil, ResultatComplet } from '@/types/questionnaire';
import { FORMULATION_PROFIL, TITRE_PROFIL } from '@/lib/questionnaire/copy';
import ProfileAvatar, { NUANCE } from '../ProfileAvatar';
import ResultBody from './ResultBody';
import { revelerSections } from './reveal';

const ORDRE: Profil[] = ['DRAIN', 'CORTISOL', 'METABOLIQUE', 'DIGEST'];

/**
 * Variante B — les quatre terrains affichés, le vôtre mis en avant.
 * Aucun score, aucun classement n'est montré : les trois autres emblèmes ne sont
 * qu'un repère de lecture, jamais un palmarès.
 */
export default function ResultB({
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
      tl.add(monte('.rc-rb-eyebrow', { y: 12 }, { duration: 0.5 }))
        .add(monte('.rc-rb-terrain', { y: 20, scale: 0.9 }, { duration: 0.6, stagger: 0.1 }), 0.1)
        // Le terrain retenu se détache après coup : on voit les quatre, puis le sien.
        .to('.rc-rb-actif', { scale: 1.12, duration: 0.6, ease: 'back.out(1.7)' }, 0.95)
        .to('.rc-rb-inactif', { opacity: 0.4, duration: 0.5 }, 0.95)
        .add(monte('.rc-rb-txt', { y: 18 }, { duration: 0.6, stagger: 0.09 }), 1.15);
      revelerSections();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-[100dvh] bg-[#FBF8F4]">
      <header className="relative overflow-hidden px-5 pb-16 pt-16 text-center sm:px-8 sm:pt-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[52vh]"
          style={{
            background: `radial-gradient(110% 62% at 50% 0%, ${NUANCE[dominant].halo}, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-2xl">
          <p className="rc-rb-eyebrow text-[11px] font-medium uppercase tracking-[0.26em] text-[#7B7066]">
            Merci {prenom} · votre orientation
          </p>

          <div className="mt-11 flex items-end justify-center gap-4 sm:gap-9">
            {ORDRE.map((p) => {
              const actif = p === dominant;
              return (
                <div
                  key={p}
                  className={`rc-rb-terrain flex flex-col items-center ${
                    actif ? 'rc-rb-actif' : 'rc-rb-inactif'
                  }`}
                >
                  <ProfileAvatar profil={p} taille={actif ? 96 : 62} anime={actif} attenue={!actif} />
                  <p
                    className={`mt-3 max-w-[86px] text-[10.5px] uppercase leading-tight tracking-[0.1em] ${
                      actif ? 'font-medium text-[#0D2623]' : 'text-[#A79C91]'
                    }`}
                  >
                    {TITRE_PROFIL[p]}
                  </p>
                </div>
              );
            })}
          </div>

          <h1 className="rc-rb-txt mt-14 text-[#0D2623]">{TITRE_PROFIL[dominant]}</h1>
          <p className="rc-rb-txt mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-[#1A4D47]">
            {FORMULATION_PROFIL[dominant]}
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-xl px-5 pb-28 sm:px-8">
        <ResultBody resultat={resultat} dominant={dominant} ouvrant={ouvrant} />
      </div>
    </div>
  );
}
