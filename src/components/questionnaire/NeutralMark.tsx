'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Marque neutre des écrans sans terrain : « à orienter », réponses uniformes,
 * aucun profil exprimé.
 *
 * Elle reprend l'anneau pointillé des emblèmes pour rester dans la même famille
 * graphique, mais en sable et sans glyphe de terrain : ces écrans ne désignent
 * aucun profil, et rien ne doit laisser croire le contraire. Pas de halo, pas de
 * pulsation — le ton reste posé.
 */
export default function NeutralMark({ taille = 104 }: { taille?: number }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('.rc-nm-ring', {
        rotate: 360,
        duration: 44,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50% 50%',
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="relative mx-auto"
      style={{ width: taille, height: taille }}
      aria-hidden
    >
      <svg viewBox="0 0 132 132" className="h-full w-full">
        <circle
          className="rc-nm-ring"
          cx="66" cy="66" r="60"
          fill="none" stroke="#CBB9A7" strokeWidth="1.4"
          strokeDasharray="5 11" strokeLinecap="round" opacity="0.85"
        />
        <circle cx="66" cy="66" r="46" fill="#CBB9A7" opacity="0.10" />
        <circle cx="66" cy="66" r="46" fill="none" stroke="#CBB9A7" strokeWidth="1.2" opacity="0.5" />
        {/* Deux traits de dialogue : un échange à venir, jamais un résultat. */}
        <path
          d="M 48 60 h 36 M 48 72 h 22"
          stroke="#8F7B68" strokeWidth="2.4" strokeLinecap="round" opacity="0.75"
        />
      </svg>
    </div>
  );
}
