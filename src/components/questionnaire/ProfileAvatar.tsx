'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { Profil } from '@/types/questionnaire';

/**
 * Emblème de terrain — un par profil, entièrement dessiné en SVG.
 *
 * Aucun visuel externe : l'emblème reste net à toute taille, se colore dans la
 * palette de la marque et s'anime selon ce qu'il représente. Le mouvement porte
 * le sens — l'onde circule, l'anneau respire, le flux pulse, l'arc digère — donc
 * il est désactivé proprement pour `prefers-reduced-motion`.
 */

export const NUANCE: Record<Profil, { de: string; a: string; halo: string }> = {
  DRAIN: { de: '#91DBD3', a: '#51B1AA', halo: 'rgba(81,177,170,0.28)' },
  CORTISOL: { de: '#7FCFC7', a: '#2D6D68', halo: 'rgba(81,177,170,0.26)' },
  METABOLIQUE: { de: '#E3BD93', a: '#CBB9A7', halo: 'rgba(203,185,167,0.34)' },
  DIGEST: { de: '#91DBD3', a: '#2D6D68', halo: 'rgba(145,219,211,0.30)' },
};

interface Props {
  profil: Profil;
  taille?: number;
  /** Un emblème estompé sert de repère secondaire, jamais de résultat. */
  attenue?: boolean;
  anime?: boolean;
  className?: string;
}

export default function ProfileAvatar({
  profil,
  taille = 132,
  attenue = false,
  anime = true,
  className = '',
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const nuance = NUANCE[profil];
  const id = `rc-grad-${profil}`;

  useEffect(() => {
    if (!anime || !root.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // L'anneau extérieur tourne lentement pour tous les terrains.
      gsap.to('.rc-av-ring', {
        rotate: 360,
        duration: 26,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50% 50%',
      });

      if (profil === 'DRAIN') {
        // La circulation : les ondes défilent sans jamais s'arrêter.
        gsap.to('.rc-av-wave', {
          x: -40,
          duration: 3.4,
          ease: 'none',
          repeat: -1,
          stagger: { each: 0.18, from: 'start' },
        });
      }

      if (profil === 'CORTISOL') {
        // La récupération : une respiration ample, jamais pressée.
        gsap.to('.rc-av-breath', {
          scale: 1.14,
          opacity: 0.45,
          duration: 2.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          transformOrigin: '50% 50%',
          stagger: 0.22,
        });
      }

      if (profil === 'METABOLIQUE') {
        // L'énergie : un flux qui se trace, se vide, se retrace.
        gsap.fromTo(
          '.rc-av-flux',
          { strokeDashoffset: 152 },
          {
            strokeDashoffset: -22,
            duration: 2.6,
            ease: 'none',
            repeat: -1,
            stagger: 0.3,
          },
        );
      }

      if (profil === 'DIGEST') {
        // La digestion : un rythme régulier qui descend, arc après arc.
        gsap.to('.rc-av-arc', {
          y: 5,
          opacity: 0.5,
          duration: 1.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: 0.24,
        });
      }
    }, root);

    return () => ctx.revert();
  }, [profil, anime]);

  return (
    <div
      ref={root}
      className={`relative shrink-0 ${className}`}
      style={{ width: taille, height: taille }}
      aria-hidden
    >
      {!attenue && (
        <div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ background: nuance.halo }}
        />
      )}

      <svg
        viewBox="0 0 132 132"
        className="relative h-full w-full"
        style={{ opacity: attenue ? 0.32 : 1, transition: 'opacity .5s ease' }}
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={nuance.de} />
            <stop offset="100%" stopColor={nuance.a} />
          </linearGradient>
          <clipPath id={`${id}-clip`}>
            <circle cx="66" cy="66" r="42" />
          </clipPath>
        </defs>

        {/* Anneau extérieur pointillé, commun aux quatre terrains */}
        <circle
          className="rc-av-ring"
          cx="66" cy="66" r="60"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="1.4"
          strokeDasharray="5 11"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* Disque intérieur */}
        <circle cx="66" cy="66" r="46" fill={`url(#${id})`} opacity="0.10" />
        <circle
          cx="66" cy="66" r="46"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="1.2"
          opacity="0.45"
        />

        <g clipPath={`url(#${id}-clip)`}>
          {profil === 'DRAIN' && <Ondes id={id} />}
          {profil === 'CORTISOL' && <Anneaux id={id} />}
          {profil === 'METABOLIQUE' && <Flux id={id} />}
          {profil === 'DIGEST' && <Arcs id={id} />}
        </g>
      </svg>
    </div>
  );
}

/** DRAIN™ — la circulation : des ondes qui traversent sans s'arrêter. */
function Ondes({ id }: { id: string }) {
  const lignes = [44, 58, 72, 86];
  return (
    <g>
      {lignes.map((y, i) => (
        <path
          key={y}
          className="rc-av-wave"
          d={`M -22 ${y} q 10 -8 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0`}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={i === 1 || i === 2 ? 2.4 : 1.6}
          strokeLinecap="round"
          opacity={i === 1 || i === 2 ? 0.95 : 0.5}
        />
      ))}
    </g>
  );
}

/** CORTISOL™ — la récupération : des cercles qui respirent. */
function Anneaux({ id }: { id: string }) {
  return (
    <g>
      {[34, 25, 16].map((r, i) => (
        <circle
          key={r}
          className="rc-av-breath"
          cx="66" cy="66" r={r}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={i === 2 ? 2.6 : 1.7}
          opacity={0.4 + i * 0.2}
        />
      ))}
      <circle cx="66" cy="66" r="6" fill={`url(#${id})`} opacity="0.9" />
    </g>
  );
}

/**
 * MÉTABOLIQUE™ — l'énergie : un flux stable que parcourt une impulsion.
 *
 * Le tracé reste visible en permanence ; seule une courte impulsion le remonte.
 * Un tracé qui disparaît entre deux passages se lirait comme un glyphe cassé,
 * pas comme de l'énergie.
 */
function Flux({ id }: { id: string }) {
  const traces = [
    { d: 'M 30 74 L 48 52 L 63 66 L 81 44 L 102 60', w: 2.6, o: 0.95 },
    { d: 'M 30 58 L 48 40 L 63 52 L 81 34 L 102 46', w: 1.5, o: 0.4 },
    { d: 'M 30 90 L 48 70 L 63 84 L 81 62 L 102 78', w: 1.5, o: 0.4 },
  ];
  return (
    <g>
      {traces.map((t) => (
        <path
          key={t.d}
          d={t.d}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={t.w}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={t.o}
        />
      ))}
      {traces.map((t) => (
        <path
          key={`pulse-${t.d}`}
          className="rc-av-flux"
          d={t.d}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={t.w + 1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="22 130"
          opacity="0.95"
        />
      ))}
    </g>
  );
}

/**
 * DIGEST™ — la digestion : des arcs de même sens qui descendent l'un après
 * l'autre. Les arcs alternés se croisaient et dessinaient une lentille : ils ne
 * se lisaient plus comme un rythme.
 */
function Arcs({ id }: { id: string }) {
  const arcs = [
    { y: 40, demi: 34, w: 1.6, o: 0.45 },
    { y: 56, demi: 30, w: 2.4, o: 0.95 },
    { y: 72, demi: 24, w: 2.4, o: 0.95 },
    { y: 86, demi: 17, w: 1.6, o: 0.45 },
  ];
  return (
    <g>
      {arcs.map((a) => (
        <path
          key={a.y}
          className="rc-av-arc"
          d={`M ${66 - a.demi} ${a.y} q ${a.demi} 19 ${a.demi * 2} 0`}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={a.w}
          strokeLinecap="round"
          opacity={a.o}
        />
      ))}
    </g>
  );
}
