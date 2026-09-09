'use client';

import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

const COULEURS = ['#51B1AA', '#91DBD3', '#CBB9A7', '#E3BD93', '#2D6D68'];

/**
 * Confettis de fin de parcours, dans la palette de la marque.
 *
 * Ils saluent le fait d'être allée au bout des 50 questions — jamais une
 * performance : le questionnaire n'a ni bonne ni mauvaise réponse. Une seule
 * salve, puis plus rien : une pluie continue transformerait une orientation
 * bien-être en jeu.
 */
export default function Confetti({ actif = true }: { actif?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  // Positions figées au premier rendu : elles ne doivent pas bouger d'un rendu
  // à l'autre, sinon les pièces sautent pendant l'animation.
  const pieces = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        gauche: Math.random() * 100,
        couleur: COULEURS[i % COULEURS.length],
        largeur: 5 + Math.random() * 5,
        hauteur: 8 + Math.random() * 9,
        rond: Math.random() > 0.66,
        retard: Math.random() * 0.5,
        duree: 2.4 + Math.random() * 1.6,
        derive: (Math.random() - 0.5) * 190,
        rotation: (Math.random() - 0.5) * 720,
      })),
    [],
  );

  useEffect(() => {
    if (!actif || !root.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      pieces.forEach((p) => {
        gsap.fromTo(
          `#rc-conf-${p.id}`,
          { y: -60, x: 0, opacity: 1, rotate: 0 },
          {
            y: '110vh',
            x: p.derive,
            rotate: p.rotation,
            opacity: 0,
            duration: p.duree,
            delay: p.retard,
            ease: 'none',
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [actif, pieces]);

  if (!actif) return null;

  return (
    <div
      ref={root}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          id={`rc-conf-${p.id}`}
          className="absolute top-0"
          style={{
            left: `${p.gauche}%`,
            width: p.largeur,
            height: p.rond ? p.largeur : p.hauteur,
            background: p.couleur,
            borderRadius: p.rond ? '50%' : 2,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
