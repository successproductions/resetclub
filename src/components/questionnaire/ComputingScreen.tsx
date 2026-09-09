'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ETAPES = [
  'Lecture de vos réponses',
  'Pondération des questions signature',
  'Prise en compte de votre contexte',
  'Classement des terrains',
  'Construction de votre orientation',
];

/**
 * Interstitiel de calcul. Le moteur répond en quelques millisecondes : cet écran
 * existe pour donner au résultat le poids qu'il mérite, jamais pour simuler un
 * traitement qui n'aurait pas lieu.
 */
export default function ComputingScreen({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [etape, setEtape] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.rc-orb-ring', {
        rotate: 360,
        duration: 7,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50% 50%',
      });
      gsap.to('.rc-orb-ring-2', {
        rotate: -360,
        duration: 11,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50% 50%',
      });
      gsap.to('.rc-orb-core', {
        scale: 1.12,
        opacity: 0.85,
        duration: 1.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, root);

    const minuteurs = ETAPES.map((_, i) =>
      setTimeout(() => setEtape(i), i * 520),
    );
    const fin = setTimeout(onDone, ETAPES.length * 520 + 500);

    return () => {
      ctx.revert();
      minuteurs.forEach(clearTimeout);
      clearTimeout(fin);
    };
  }, [onDone]);

  return (
    <div
      ref={root}
      className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
    >
      <div className="relative h-40 w-40">
        <svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full">
          <circle
            className="rc-orb-ring"
            cx="80" cy="80" r="66"
            fill="none" stroke="#51B1AA" strokeWidth="1.5"
            strokeDasharray="8 14" strokeLinecap="round" opacity="0.65"
          />
          <circle
            className="rc-orb-ring-2"
            cx="80" cy="80" r="52"
            fill="none" stroke="#CBB9A7" strokeWidth="1.5"
            strokeDasharray="3 10" strokeLinecap="round" opacity="0.8"
          />
        </svg>
        <div className="rc-orb-core absolute inset-[38px] rounded-full bg-gradient-to-br from-[#91DBD3] to-[#51B1AA] opacity-70 blur-[2px]" />
      </div>

      <p className="mt-12 text-[12px] font-medium uppercase tracking-[0.24em] text-[#51B1AA]">
        Analyse en cours
      </p>

      <div className="mt-4 h-7 overflow-hidden">
        <p key={etape} className="rc-fade-up text-[16px] text-[#0D2623]">
          {ETAPES[etape]}
        </p>
      </div>
    </div>
  );
}
