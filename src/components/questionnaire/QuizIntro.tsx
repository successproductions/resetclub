'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { INTRO, DUREE_ESTIMEE_MINUTES, NB_ITEMS_TOTAL } from '@/lib/questionnaire/questions';
import { IMAGES } from '@/lib/questionnaire/theme';

const REPERES = [
  `${DUREE_ESTIMEE_MINUTES} minutes`,
  `${NB_ITEMS_TOTAL} questions`,
  'Confidentiel',
];

/**
 * Entrée immersive : l'image occupe tout l'écran, le texte se pose dessus.
 * Le voile dégradé n'est pas décoratif — il garantit le contraste du texte quel
 * que soit le visuel placé derrière, y compris après remplacement de l'image.
 */
export default function QuizIntro({ onStart }: { onStart: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const fond = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const monte = (cible: string, depuis: gsap.TweenVars, vars: gsap.TweenVars) =>
        gsap.fromTo(
          cible,
          { opacity: 0, ...depuis },
          { opacity: 1, y: 0, scale: 1, ...vars },
        );

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.rc-hero-media',
        { opacity: 0, scale: reduit ? 1 : 1.1 },
        { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' },
      )
        .add(monte('.rc-hero-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.7 }), 0.45)
        .add(monte('.rc-hero-eyebrow', { y: 16 }, { duration: 0.6 }), 0.55)
        .add(monte('.rc-hero-title span', { y: 44 }, { duration: 0.9, stagger: 0.09 }), 0.7)
        .add(monte('.rc-hero-lead', { y: 20 }, { duration: 0.7 }), 1.15)
        .add(monte('.rc-hero-cta', { y: 18 }, { duration: 0.6 }), 1.3)
        .add(monte('.rc-hero-repere', { y: 14 }, { duration: 0.55, stagger: 0.09 }), 1.42)
        .add(monte('.rc-hero-cadre', { y: 12 }, { duration: 0.6 }), 1.55);

      if (reduit || !fond.current) return;

      // Parallaxe douce à la souris : l'image respire sous le texte, qui ne bouge pas.
      const surSouris = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 22;
        const y = (e.clientY / window.innerHeight - 0.5) * 16;
        gsap.to(fond.current, { x, y, duration: 1.1, ease: 'power2.out' });
      };
      window.addEventListener('mousemove', surSouris);
      return () => window.removeEventListener('mousemove', surSouris);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative min-h-[100dvh] overflow-hidden bg-[#0D2623]">
      {/* Image plein écran, légèrement surdimensionnée pour absorber la parallaxe */}
      <div ref={fond} className="rc-hero-media absolute -inset-8">
        <Image
          src={IMAGES.intro}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Voile de lisibilité — indispensable, quelle que soit l'image */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D2623] via-[#0D2623]/72 to-[#0D2623]/38" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D2623]/78 via-transparent to-transparent" />

      <div className="relative flex min-h-[100dvh] flex-col justify-end px-6 pb-14 pt-24 sm:px-12 sm:pb-20 lg:px-20 lg:pb-24">
        <div className="mx-auto w-full max-w-5xl">
          <div className="rc-hero-rule h-px w-20 origin-left bg-[#91DBD3]/70" />

          <p className="rc-hero-eyebrow mt-6 text-[11px] font-medium uppercase tracking-[0.36em] text-[#91DBD3]">
            Reset Club™ · Biohacking · Longévité
          </p>

          <h1 className="rc-hero-title mt-6 max-w-3xl text-white">
            <span className="block overflow-hidden">Questionnaire</span>
            <span className="block overflow-hidden italic text-[#91DBD3]">Profil</span>
          </h1>

          <p className="rc-hero-lead mt-7 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-[17px]">
            {INTRO.paragraphes[0]}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <button
              type="button"
              onClick={onStart}
              className="rc-hero-cta group inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-[15px] font-medium text-[#0D2623] transition-all duration-300 hover:bg-[#91DBD3] hover:shadow-[0_16px_44px_-16px_rgba(145,219,211,0.85)]"
            >
              Commencer
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {REPERES.map((r, i) => (
                <span
                  key={r}
                  className="rc-hero-repere flex items-center gap-5 text-[13px] tracking-wide text-white/65"
                >
                  {i > 0 && <span className="h-3 w-px bg-white/25" />}
                  {r}
                </span>
              ))}
            </div>
          </div>

          <p className="rc-hero-cadre mt-12 max-w-lg border-l border-[#CBB9A7]/50 pl-4 text-[12.5px] leading-relaxed text-white/55">
            {INTRO.cadre}
          </p>
        </div>
      </div>
    </div>
  );
}
