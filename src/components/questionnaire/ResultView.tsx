'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowDown, ArrowRight, Check, Sparkles } from 'lucide-react';
import type { Profil, Resultat, ResultatComplet } from '@/types/questionnaire';
import { estAOrienter, estComplet } from '@/types/questionnaire';
import {
  AMORCE,
  FORMULATION_PROFIL,
  LEVIERS,
  MANIFESTATIONS,
  MENTION_FINALE,
  MESSAGE_A_ORIENTER,
  MESSAGE_A_REPRENDRE,
  MESSAGE_SANS_PROFIL,
  NOTE_INTENSITE,
  PROCHAINE_ETAPE,
  TITRE_PROFIL,
} from '@/lib/questionnaire/copy';
import ProfileAvatar, { NUANCE } from './ProfileAvatar';
import Confetti from './variants/Confetti';
import NeutralMark from './NeutralMark';
import { revelerSections } from './variants/reveal';

const ORDRE: Profil[] = ['DRAIN', 'CORTISOL', 'METABOLIQUE', 'DIGEST'];

/**
 * Bloc 8 — rapport cliente, en écran de fin de parcours.
 *
 * On salue le fait d'être allée au bout, jamais une performance : le
 * questionnaire n'a ni bonne ni mauvaise réponse. Aucun score, aucun nom de code
 * de profil, aucun indice de fiabilité n'apparaît ici — tout le texte vient de
 * `copy.ts`. La rangée des quatre terrains est un repère de lecture, pas un
 * classement : ni rang ni valeur n'y figurent.
 */
export default function ResultView({
  resultat,
  prenom,
}: {
  resultat: Resultat;
  prenom: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const complet = estComplet(resultat) ? (resultat as ResultatComplet) : null;
  const dominant = complet?.classement[0].profil;
  const ouvrant = complet?.profil_ouvrant;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const monte = (c: string, d: gsap.TweenVars, v: gsap.TweenVars) =>
        gsap.fromTo(c, { opacity: 0, ...d }, { opacity: 1, y: 0, scale: 1, ...v });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.add(monte('.rc-fin-carte', { y: 26, scale: reduit ? 1 : 0.97 }, { duration: 0.7 }))
        .add(
          monte('.rc-fin-emb', { scale: 0.55 }, { duration: 0.85, ease: 'back.out(1.7)' }),
          0.18,
        )
        .add(monte('.rc-fin-titre', { y: 18 }, { duration: 0.6 }), 0.5)
        .add(monte('.rc-fin-msg', { y: 16 }, { duration: 0.55 }), 0.62)
        .add(monte('.rc-fin-bloc', { y: 18 }, { duration: 0.6, stagger: 0.13 }), 0.76)
        .add(monte('.rc-fin-chip', { y: 12, scale: 0.86 }, { duration: 0.45, stagger: 0.07 }), 1.0);

      if (!reduit) {
        gsap.to('.rc-fin-fleche', {
          y: 5,
          duration: 1.1,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
      revelerSections();
    }, root);
    return () => ctx.revert();
  }, []);

  // ── Cas « à orienter » (Étape 1) : ni confettis, ni terrain, ni félicitations.
  //    On ne fête pas une réponse qui impose un échange préalable.
  if (estAOrienter(resultat)) {
    return (
      <div ref={root} className="min-h-[100dvh] bg-[#FBF8F4]">
        <Ecran confetti={false}>
          <div className="rc-fin-emb">
            <NeutralMark />
          </div>
          <p className="rc-fin-titre mt-8 text-[11px] font-medium uppercase tracking-[0.26em] text-[#9C9186]">
            Merci {prenom}
          </p>
          <h1 className="rc-fin-titre mt-4 text-[#0D2623]">
            Nous préférons en parler avec vous
          </h1>
          <p className="rc-fin-msg mx-auto mt-5 max-w-sm text-[15px] leading-relaxed text-[#5B5148]">
            {MESSAGE_A_ORIENTER}
          </p>
          <div className="rc-fin-bloc mt-9 rounded-2xl border border-[#CBB9A7]/55 bg-[#CBB9A7]/12 px-6 py-5">
            <p className="text-[13.5px] leading-relaxed text-[#524029]">
              Vos réponses restent enregistrées. Vous n’avez rien à refaire : nous les
              reprendrons ensemble lors de l’échange.
            </p>
          </div>
        </Ecran>
        <Corps>
          <Mention />
        </Corps>
      </div>
    );
  }

  // ── Réponses uniformes (Étape 4) ou aucun profil exprimé (Étape 8)
  if (!complet) {
    const uniforme = 'fiabilite' in resultat && resultat.fiabilite === 'insuffisante';
    return (
      <div ref={root} className="min-h-[100dvh] bg-[#FBF8F4]">
        <Ecran confetti={false}>
          <div className="rc-fin-emb">
            <NeutralMark />
          </div>
          <p className="rc-fin-titre mt-8 text-[11px] font-medium uppercase tracking-[0.26em] text-[#9C9186]">
            Merci {prenom}
          </p>
          <h1 className="rc-fin-titre mt-4 text-[#0D2623]">
            {uniforme ? 'Reprenons cela ensemble' : 'Aucune priorité ne se détache'}
          </h1>
          <p className="rc-fin-msg mx-auto mt-5 max-w-sm text-[15px] leading-relaxed text-[#5B5148]">
            {uniforme ? MESSAGE_A_REPRENDRE : MESSAGE_SANS_PROFIL}
          </p>
        </Ecran>
        <Corps>
          <section className="rc-sect">
            <ProchaineEtape />
          </section>
          <Mention />
        </Corps>
      </div>
    );
  }

  const d = dominant!;
  const o = ouvrant!;
  const prudent =
    complet.fiabilite === 'a_verifier' ||
    complet.fiabilite === 'moyenne' ||
    complet.dominance === 'mixte';
  const noteIntensite = NOTE_INTENSITE[complet.intensite_depart];

  return (
    <div ref={root} className="min-h-[100dvh] bg-[#FBF8F4]">
      <Ecran confetti teinte={d}>
        <div className="rc-fin-emb mx-auto w-fit">
          <ProfileAvatar profil={d} taille={124} />
        </div>

        <h1 className="rc-fin-titre mt-6 text-[#0D2623]">Merci {prenom} !</h1>

        <p className="rc-fin-msg mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-[#5B5148]">
          Vous êtes allée au bout des cinquante questions. Voici ce que vos réponses
          nous permettent de comprendre aujourd’hui.
        </p>

        {/* Là où un quiz afficherait un score, on nomme le terrain. Aucun chiffre. */}
        <div className="rc-fin-bloc mt-9">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#9C9186]">
            Votre orientation
          </p>
          <p
            className="rc-fin-terrain mt-3 font-medium"
            style={{ color: NUANCE[d].a }}
          >
            {TITRE_PROFIL[d]}
          </p>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#1A4D47]">
            {FORMULATION_PROFIL[d]}
          </p>
        </div>

        {/* Repère de lecture : les quatre terrains, le sien signalé. Sans rang. */}
        <div className="rc-fin-bloc mt-9">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#9C9186]">
            Les quatre terrains
          </p>
          <div className="mx-auto mt-5 grid max-w-sm grid-cols-2 gap-2.5">
            {ORDRE.map((p) => {
              const sien = p === d;
              return (
                <span
                  key={p}
                  className={`rc-fin-chip flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-left text-[12px] leading-tight transition-colors ${
                    sien ? 'font-medium text-[#0D2623]' : 'border-[#E7DFD6] text-[#A79C91]'
                  }`}
                  style={
                    sien
                      ? { borderColor: NUANCE[p].a, background: `${NUANCE[p].de}1F` }
                      : undefined
                  }
                >
                  <ProfileAvatar profil={p} taille={24} anime={false} attenue={!sien} />
                  <span className="min-w-0 flex-1">{TITRE_PROFIL[p]}</span>
                  {sien && (
                    <Check size={13} strokeWidth={3} className="shrink-0" style={{ color: NUANCE[p].a }} />
                  )}
                </span>
              );
            })}
          </div>
        </div>

        <a
          href="#lecture"
          className="rc-fin-bloc mt-9 inline-flex flex-col items-center gap-2 text-[14px] font-medium text-[#2D6D68] transition-colors hover:text-[#0D2623]"
        >
          Voir ma lecture détaillée
          <ArrowDown size={17} className="rc-fin-fleche" />
        </a>
      </Ecran>

      <Corps>
        <div id="lecture" className="scroll-mt-8" />

        <section className="rc-sect">
          <Titre>Ce que vos réponses nous apprennent</Titre>
          <p className="mt-3 text-[15px] leading-relaxed text-[#5B5148]">
            Vous avez pris le temps de répondre avec nuance, et cela se voit : vos réponses
            dessinent une orientation lisible plutôt qu’un tableau uniforme.
            {prudent
              ? " Plusieurs terrains se répondent chez vous, et c'est précisément ce que nous regarderons ensemble au centre."
              : ' Une priorité se détache nettement des autres.'}
          </p>
        </section>

        <section className="rc-sect mt-12">
          <Titre>Ce que cela explique peut-être au quotidien</Titre>
          <ul className="mt-4 space-y-3">
            {MANIFESTATIONS[d].map((m) => (
              <li key={m} className="flex gap-3 text-[15px] leading-relaxed text-[#5B5148]">
                <span
                  className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: NUANCE[d].a }}
                />
                {m}
              </li>
            ))}
          </ul>
        </section>

        <section className="rc-sect mt-12">
          <Titre>Par quoi nous commençons</Titre>
          {o !== d && (
            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-[#E7DFD6] bg-white px-5 py-4">
              <ProfileAvatar profil={o} taille={46} anime={false} />
              <p className="text-[14.5px] leading-relaxed text-[#5B5148]">
                Nous ne commencerions pas par là, et c’est volontaire : {AMORCE[o]}
              </p>
            </div>
          )}
          <div className="mt-4 space-y-3">
            {LEVIERS[o].map((l, i) => (
              <div
                key={l}
                className="flex gap-4 rounded-2xl border border-[#E7DFD6] bg-white px-5 py-4"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-medium text-white"
                  style={{ background: NUANCE[o].a }}
                >
                  {i + 1}
                </span>
                <p className="text-[15px] leading-relaxed text-[#5B5148]">{l}</p>
              </div>
            ))}
            {noteIntensite && (
              <div className="flex gap-3 rounded-2xl border border-[#CBB9A7]/60 bg-[#CBB9A7]/12 px-5 py-4">
                <Sparkles size={17} className="mt-0.5 shrink-0 text-[#8F7B68]" />
                <p className="text-[14px] leading-relaxed text-[#524029]">{noteIntensite}</p>
              </div>
            )}
          </div>
        </section>

        <section className="rc-sect mt-14">
          <ProchaineEtape />
        </section>

        <Mention />
      </Corps>
    </div>
  );
}

// ─── Ossature ─────────────────────────────────────────────────────────────────

function Ecran({
  children,
  confetti = false,
  teinte,
}: {
  children: React.ReactNode;
  confetti?: boolean;
  teinte?: Profil;
}) {
  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-5 py-14 sm:px-8">
      {teinte && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[62vh]"
          style={{
            background: `radial-gradient(110% 62% at 50% 0%, ${NUANCE[teinte].halo}, transparent 70%)`,
          }}
        />
      )}
      <Confetti actif={confetti} />

      <div className="rc-fin-carte relative w-full max-w-lg rounded-[34px] border border-[#E7DFD6] bg-white px-6 py-10 text-center shadow-[0_34px_90px_-46px_rgba(13,38,35,0.34)] sm:px-11 sm:py-12">
        {teinte && (
          <div
            className="absolute inset-x-0 top-0 h-[3px] rounded-t-[34px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${NUANCE[teinte].de}, ${NUANCE[teinte].a}, transparent)`,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}

const Corps = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-xl px-5 pb-28 sm:px-8">{children}</div>
);

const Titre = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[#2D6D68]">{children}</h3>
);

function ProchaineEtape() {
  return (
    <div className="rounded-3xl bg-[#0D2623] px-7 py-9 text-white sm:px-9">
      <h3 className="text-[#91DBD3]">{PROCHAINE_ETAPE.titre}</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-white/85">{PROCHAINE_ETAPE.texte}</p>
      <Link
        href="/fr/contact"
        className="group mt-7 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-[14px] font-medium text-[#0D2623] transition-all duration-300 hover:bg-[#91DBD3]"
      >
        Prendre rendez-vous
        <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

const Mention = () => (
  <p className="rc-sect mt-12 border-t border-[#E7DFD6] pt-6 text-[12px] leading-relaxed text-[#7B7066]">
    {MENTION_FINALE}
  </p>
);
