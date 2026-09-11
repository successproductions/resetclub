'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { ACCUEIL } from '@/lib/questionnaire/copy';
import { IMAGES } from '@/lib/questionnaire/theme';

/**
 * Page d'accueil — immersive : l'image occupe tout l'écran, le texte se pose
 * dessus, aligné à gauche sur le bas de page.
 *
 * Le voile dégradé n'est pas décoratif : il garantit le contraste du texte quelle
 * que soit l'image placée derrière, y compris après remplacement du visuel.
 */
export default function QuizIntro({ onStart }: { onStart: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const fond = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // `fromTo` plutôt que `from` : l'état final est écrit explicitement, donc
      // aucun élément ne peut rester bloqué à opacity 0.
      const monte = (cible: string, depuis: gsap.TweenVars, vars: gsap.TweenVars) =>
        gsap.fromTo(cible, { opacity: 0, ...depuis }, { opacity: 1, y: 0, scale: 1, ...vars });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.rc-hero-media',
        { opacity: 0, scale: reduit ? 1 : 1.1 },
        { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' },
      )
        .add(monte('.rc-hero-logo', { y: 12, scale: reduit ? 1 : 0.94 }, { duration: 0.8 }), 0.35)
        .add(monte('.rc-hero-eyebrow', { y: 14 }, { duration: 0.6 }), 0.55)
        .add(monte('.rc-hero-amorce', { y: 26 }, { duration: 0.85 }), 0.68)
        .add(monte('.rc-hero-bascule', { y: 16 }, { duration: 0.6, stagger: 0.12 }), 1.0)
        .add(monte('.rc-hero-texte', { y: 16 }, { duration: 0.6, stagger: 0.12 }), 1.2)
        .add(monte('.rc-hero-cta', { y: 16 }, { duration: 0.6 }), 1.42)
        .add(monte('.rc-hero-repere', { y: 12 }, { duration: 0.5, stagger: 0.08 }), 1.52)
        .add(monte('.rc-hero-cadre', { y: 10 }, { duration: 0.55 }), 1.64);

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
      {/* Image plein écran, légèrement surdimensionnée pour absorber la parallaxe.
          Deux cadrages : le paysage se recadre mal en portrait, donc un visuel
          dédié sous 768 px. Les deux sont servis optimisés par next/image. */}
      <div ref={fond} className="rc-hero-media absolute -inset-8">
        <Image
          src={IMAGES.introMobile}
          alt=""
          fill
          sizes="100vw"
          className="object-cover md:hidden"
        />
        <Image
          src={IMAGES.intro}
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover md:block"
        />
      </div>

      <div className="relative flex min-h-[100dvh] flex-col justify-end px-6 pb-14 pt-20 sm:px-12 sm:pb-20 lg:px-20 lg:pb-24">
        <div className="mx-auto w-full max-w-5xl">
          <Image
            src="/images/logogras.png"
            alt="Reset Club"
            width={340}
            height={540}
            priority
            className="rc-hero-logo h-auto w-[64px] sm:w-[76px]"
          />

          <p className="rc-hero-eyebrow mt-6 text-[11px] font-medium uppercase tracking-[0.36em] text-white">
            {ACCUEIL.eyebrow}
          </p>

          <h1 className="rc-hero-amorce mt-6 max-w-3xl text-white">{ACCUEIL.amorce}</h1>

          <div className="mt-8 space-y-1.5">
            {ACCUEIL.bascule.map((l, i) => (
              <p
                key={l}
                className={`rc-hero-bascule max-w-2xl text-[17px] leading-snug sm:text-[19px] ${i === 0 ? 'font-medium text-white' : 'text-white'
                  }`}
              >
                {l}
              </p>
            ))}
          </div>

          <p className="rc-hero-texte mt-7 max-w-xl text-[14.5px] leading-relaxed text-white sm:text-[16px]">
            {ACCUEIL.mecanismes}
          </p>

          <p className="rc-hero-texte mt-5 text-[15px] font-medium text-white sm:text-[16.5px]">
            {ACCUEIL.promesse}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <button
              type="button"
              onClick={onStart}
              className="rc-hero-cta group inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-[13px] font-medium uppercase tracking-[0.13em] text-[#0D2623] transition-all duration-300 hover:bg-[#91DBD3] hover:shadow-[0_16px_44px_-16px_rgba(145,219,211,0.85)]"
            >
              {ACCUEIL.cta}
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {ACCUEIL.reperes.map((r, i) => (
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

          <p className="rc-hero-cadre mt-11 max-w-lg border-l border-[#CBB9A7]/50 pl-4 text-[12.5px] leading-relaxed text-white/55">
            {ACCUEIL.cadre}
          </p>
        </div>
      </div>
    </div>
  );
}
