'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Check } from 'lucide-react';

export interface Chapitre {
  cle: string;
  label: string;
  /** Nombre d'écrans que compte le chapitre. */
  taille: number;
}

interface Props {
  chapitres: Chapitre[];
  /** Index de l'écran courant, tous chapitres confondus. */
  indexCourant: number;
}

/**
 * Rail de progression segmenté : un segment par chapitre, rempli au fur et à
 * mesure. Le chapitre courant reste nommé, les autres se réduisent à leur barre
 * pour ne pas saturer la ligne sur mobile.
 */
export default function ProgressRail({ chapitres, indexCourant }: Props) {
  const railRef = useRef<HTMLDivElement>(null);

  let cumul = 0;
  const segments = chapitres.map((ch) => {
    const debut = cumul;
    cumul += ch.taille;
    const avancement = Math.min(1, Math.max(0, (indexCourant - debut) / ch.taille));
    return { ...ch, debut, avancement, actif: indexCourant >= debut && indexCourant < cumul };
  });

  useEffect(() => {
    if (!railRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.rc-rail-fill', {
        scaleX: (i) => segments[i].avancement,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.02,
      });
    }, railRef);
    return () => ctx.revert();
  });

  return (
    <div ref={railRef} className="flex items-center gap-1.5 sm:gap-2">
      {segments.map((seg) => (
        <div
          key={seg.cle}
          className="flex min-w-0 items-center gap-2 transition-all duration-500"
          style={{ flexGrow: seg.actif ? 2.4 : 1, flexBasis: 0 }}
        >
          <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-[#E7DFD6]">
            <div
              className="rc-rail-fill absolute inset-0 origin-left rounded-full"
              style={{
                transform: 'scaleX(0)',
                background:
                  seg.avancement >= 1
                    ? 'linear-gradient(90deg,#91DBD3,#51B1AA)'
                    : 'linear-gradient(90deg,#51B1AA,#2D6D68)',
              }}
            />
          </div>
          {seg.actif && (
            <span className="hidden shrink-0 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-[#2D6D68] sm:block">
              {seg.label}
            </span>
          )}
          {seg.avancement >= 1 && !seg.actif && (
            <Check size={12} strokeWidth={3} className="shrink-0 text-[#51B1AA]" />
          )}
        </div>
      ))}
    </div>
  );
}
