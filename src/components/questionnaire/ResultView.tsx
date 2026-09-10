'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowDown, ArrowRight, Check } from 'lucide-react';
import type { Profil, Resultat, ResultatComplet } from '@/types/questionnaire';
import { estAOrienter, estComplet } from '@/types/questionnaire';
import {
  ACCROCHE,
  AU_CENTRE,
  BRAVO,
  CODE_PROFIL,
  LABEL_PROFIL,
  LABEL_QUATRE,
  LECTURE,
  LIEN_DETAIL,
  MENTION_FINALE,
  MESSAGE_A_ORIENTER,
  MESSAGE_A_REPRENDRE,
  PROFIL_EQUILIBRE,
  RASSURANCE_A_ORIENTER,
  SIGNATURE,
  TITRE_PROFIL,
} from '@/lib/questionnaire/copy';
import ProfileAvatar, { NUANCE } from './ProfileAvatar';
import NeutralMark from './NeutralMark';
import Confetti from './Confetti';
import { revelerSections } from './reveal';

const ORDRE: Profil[] = ['DRAIN', 'CORTISOL', 'METABOLIQUE', 'DIGEST'];

/**
 * Page de résultat — conforme au document de la direction.
 *
 * La carte enchaîne directement sur « Ce qui vous attend au centre » : le
 * document ne prévoit aucune section de détail entre les deux. Tout le texte
 * vient de `copy.ts`. Aucun chiffre n'apparaît, et la grille des quatre profils
 * est un repère de lecture — ni rang, ni score, ni ordre de mérite.
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const monte = (c: string, d: gsap.TweenVars, v: gsap.TweenVars) =>
        gsap.fromTo(c, { opacity: 0, ...d }, { opacity: 1, y: 0, scale: 1, ...v });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.add(monte('.rc-fin-carte', { y: 26, scale: reduit ? 1 : 0.97 }, { duration: 0.7 }))
        .add(monte('.rc-fin-emb', { scale: 0.55 }, { duration: 0.85, ease: 'back.out(1.7)' }), 0.18)
        .add(monte('.rc-fin-titre', { y: 18 }, { duration: 0.6 }), 0.5)
        .add(monte('.rc-fin-msg', { y: 16 }, { duration: 0.55 }), 0.62)
        .add(monte('.rc-fin-bloc', { y: 18 }, { duration: 0.6, stagger: 0.13 }), 0.76)
        .add(monte('.rc-fin-chip', { y: 12, scale: 0.86 }, { duration: 0.45, stagger: 0.07 }), 1.0);

      if (!reduit) {
        gsap.to('.rc-fin-fleche', { y: 5, duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      }
      revelerSections();
    }, root);
    return () => ctx.revert();
  }, []);

  // ── Éligibilité bloquante (Étape 1) — hors document.
  //    Le moteur n'a produit aucun profil : il n'y a rien à nommer, et rien à
  //    féliciter chez une cliente à qui l'on demande d'abord un échange.
  if (estAOrienter(resultat)) {
    return (
      <Page root={root}>
        <Ecran>
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
              {RASSURANCE_A_ORIENTER}
            </p>
          </div>
        </Ecran>
        <Corps>
          <Mention />
        </Corps>
      </Page>
    );
  }

  // ── Réponses uniformes (Étape 4) — hors document. Le questionnaire est à
  //    reprendre : annoncer un profil équilibré serait une lecture impossible.
  if (!complet && 'fiabilite' in resultat && resultat.fiabilite === 'insuffisante') {
    return (
      <Page root={root}>
        <Ecran>
          <div className="rc-fin-emb">
            <NeutralMark />
          </div>
          <p className="rc-fin-titre mt-8 text-[11px] font-medium uppercase tracking-[0.26em] text-[#9C9186]">
            Merci {prenom}
          </p>
          <h1 className="rc-fin-titre mt-4 text-[#0D2623]">Reprenons cela ensemble</h1>
          <p className="rc-fin-msg mx-auto mt-5 max-w-sm text-[15px] leading-relaxed text-[#5B5148]">
            {MESSAGE_A_REPRENDRE}
          </p>
        </Ecran>
        <Corps>
          <section className="rc-sect">
            <AuCentre sansProfil />
          </section>
          <Mention />
        </Corps>
      </Page>
    );
  }

  // ── Profil équilibré (Étape 8) — cinquième écran du document.
  if (!complet) {
    return (
      <Page root={root}>
        <Ecran confetti>
          <div className="rc-fin-emb">
            <NeutralMark taille={118} />
          </div>
          <Entete prenom={prenom} />
          <Profil
            code={PROFIL_EQUILIBRE.code}
            codeCouleur="#7A6754"
            titre={PROFIL_EQUILIBRE.titre}
            accroche={PROFIL_EQUILIBRE.accroche}
            lecture={PROFIL_EQUILIBRE.lecture}
          />
          <Grille dominant={null} />
          <LienDetail />
        </Ecran>
        <Corps>
          <div id="lecture" className="scroll-mt-8" />
          <section className="rc-sect">
            <AuCentre sansProfil />
          </section>
          <Mention />
        </Corps>
      </Page>
    );
  }

  // ── Les quatre profils
  const d = complet.classement[0].profil;

  return (
    <Page root={root}>
      <Ecran confetti teinte={d}>
        <div className="rc-fin-emb mx-auto w-fit">
          <ProfileAvatar profil={d} taille={122} />
        </div>
        <Entete prenom={prenom} />
        <Profil
          code={CODE_PROFIL[d]}
          codeCouleur={NUANCE[d].texte}
          titre={TITRE_PROFIL[d]}
          accroche={ACCROCHE[d]}
          lecture={LECTURE[d]}
        />
        <Grille dominant={d} />
        <LienDetail />
      </Ecran>

      <Corps>
        <div id="lecture" className="scroll-mt-8" />
        <section className="rc-sect">
          <AuCentre />
        </section>
        <Mention />
      </Corps>
    </Page>
  );
}

// ─── Fragments ────────────────────────────────────────────────────────────────

const Page = ({
  root,
  children,
}: {
  root: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}) => (
  <div ref={root} className="min-h-[100dvh] bg-[#FBF8F4]">
    {children}
  </div>
);

const Entete = ({ prenom }: { prenom: string }) => (
  <>
    <h1 className="rc-fin-titre mt-7 text-[#0D2623]">{BRAVO.titre(prenom)}</h1>
    <p className="rc-fin-titre mt-2 text-[16px] font-medium text-[#2D6D68]">
      {BRAVO.sousTitre}
    </p>
    <p className="rc-fin-msg mx-auto mt-5 max-w-md text-[14.5px] leading-relaxed text-[#5B5148]">
      {BRAVO.texte}
    </p>
  </>
);

function Profil({
  code,
  codeCouleur,
  titre,
  accroche,
  lecture,
}: {
  code: string;
  codeCouleur: string;
  titre: string;
  accroche: string;
  lecture: string;
}) {
  return (
    <div className="rc-fin-bloc mt-9">
      <p className="rc-label">{LABEL_PROFIL}</p>
      <p className="rc-code mt-3" style={{ color: codeCouleur }}>
        {code}
      </p>
      <p className="rc-fin-terrain mt-1.5 font-medium text-[#0D2623]">{titre}</p>
      <p className="mx-auto mt-5 max-w-md text-[15.5px] font-medium leading-relaxed text-[#1A4D47]">
        {accroche}
      </p>
      <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-[#5B5148]">
        {lecture}
      </p>
    </div>
  );
}

/** Les quatre profils. Repère de lecture : ni rang, ni score, ni ordre de mérite. */
function Grille({ dominant }: { dominant: Profil | null }) {
  return (
    <div className="rc-fin-bloc mt-10">
      <p className="rc-label">{LABEL_QUATRE}</p>
      <div className="mx-auto mt-5 grid max-w-md grid-cols-1 gap-2.5 sm:grid-cols-2">
        {ORDRE.map((p) => {
          const sien = p === dominant;
          return (
            <span
              key={p}
              className={`rc-fin-chip flex items-center gap-2.5 rounded-2xl border px-3.5 py-3 text-left transition-colors ${
                sien ? 'text-[#0D2623]' : 'border-[#E7DFD6] text-[#A79C91]'
              }`}
              style={
                sien ? { borderColor: NUANCE[p].texte, background: `${NUANCE[p].de}1F` } : undefined
              }
            >
              <ProfileAvatar profil={p} taille={26} anime={false} attenue={!sien} />
              <span className="min-w-0 flex-1 leading-tight">
                <span
                  className="block text-[10px] font-medium uppercase tracking-[0.12em]"
                  style={{ color: sien ? NUANCE[p].texte : undefined }}
                >
                  {CODE_PROFIL[p]}
                </span>
                <span className={`block text-[12px] ${sien ? 'font-medium' : ''}`}>
                  {TITRE_PROFIL[p]}
                </span>
              </span>
              {sien && (
                <Check size={14} strokeWidth={3} className="shrink-0" style={{ color: NUANCE[p].texte }} />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

const LienDetail = () => (
  <a
    href="#lecture"
    className="rc-fin-bloc mt-10 inline-flex flex-col items-center gap-2 text-[14px] font-medium text-[#2D6D68] transition-colors hover:text-[#0D2623]"
  >
    {LIEN_DETAIL}
    <ArrowDown size={17} className="rc-fin-fleche" />
  </a>
);

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

function AuCentre({ sansProfil = false }: { sansProfil?: boolean }) {
  return (
    <div className="rounded-3xl bg-[#0D2623] px-7 py-9 text-white sm:px-9">
      <h3 className="text-[#91DBD3]">{AU_CENTRE.titre}</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-white/85">
        {sansProfil ? AU_CENTRE.texteSansProfil : AU_CENTRE.texte}
      </p>
      <Link
        href="/fr/contact"
        className="group mt-7 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-[14px] font-medium text-[#0D2623] transition-all duration-300 hover:bg-[#91DBD3]"
      >
        {AU_CENTRE.cta}
        <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      <p className="mt-7 text-[14px] leading-relaxed text-white/70">
        {SIGNATURE.ligne1}
        <br />
        <span className="text-white/90">{SIGNATURE.ligne2}</span>
      </p>
    </div>
  );
}

const Mention = () => (
  <p className="rc-sect mt-12 border-t border-[#E7DFD6] pt-6 text-[12px] leading-relaxed text-[#7B7066]">
    {MENTION_FINALE}
  </p>
);
