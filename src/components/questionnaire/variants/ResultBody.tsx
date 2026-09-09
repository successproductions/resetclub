'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { Profil, ResultatComplet } from '@/types/questionnaire';
import {
  AMORCE,
  LEVIERS,
  MANIFESTATIONS,
  MENTION_FINALE,
  NOTE_INTENSITE,
  PROCHAINE_ETAPE,
} from '@/lib/questionnaire/copy';
import ProfileAvatar, { NUANCE } from '../ProfileAvatar';

/**
 * Corps du rapport cliente, partagé par toutes les variantes de mise en page.
 * Seule l'en-tête change d'une variante à l'autre : le contenu, lui, est imposé
 * par le Bloc 8 et ne doit pas varier selon l'habillage.
 */
export default function ResultBody({
  resultat,
  dominant,
  ouvrant,
}: {
  resultat: ResultatComplet;
  dominant: Profil;
  ouvrant: Profil;
}) {
  const prudent =
    resultat.fiabilite === 'a_verifier' ||
    resultat.fiabilite === 'moyenne' ||
    resultat.dominance === 'mixte';
  const noteIntensite = NOTE_INTENSITE[resultat.intensite_depart];

  return (
    <>
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
          {MANIFESTATIONS[dominant].map((m) => (
            <li key={m} className="flex gap-3 text-[15px] leading-relaxed text-[#5B5148]">
              <span
                className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: NUANCE[dominant].a }}
              />
              {m}
            </li>
          ))}
        </ul>
      </section>

      <section className="rc-sect mt-12">
        <Titre>Par quoi nous commençons</Titre>
        {ouvrant !== dominant && (
          <div className="mt-4 flex items-center gap-4 rounded-2xl border border-[#E7DFD6] bg-white px-5 py-4">
            <ProfileAvatar profil={ouvrant} taille={46} anime={false} />
            <p className="text-[14.5px] leading-relaxed text-[#5B5148]">
              Nous ne commencerions pas par là, et c’est volontaire : {AMORCE[ouvrant]}
            </p>
          </div>
        )}
        <div className="mt-4 space-y-3">
          {LEVIERS[ouvrant].map((l, i) => (
            <div
              key={l}
              className="flex gap-4 rounded-2xl border border-[#E7DFD6] bg-[#FBF8F4] px-5 py-4"
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-medium text-white"
                style={{ background: NUANCE[ouvrant].a }}
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
        <div className="rounded-3xl bg-[#0D2623] px-7 py-9 text-white sm:px-9">
          <h3 className="text-[#91DBD3]">{PROCHAINE_ETAPE.titre}</h3>
          <p className="mt-4 text-[15px] leading-relaxed text-white/85">
            {PROCHAINE_ETAPE.texte}
          </p>
          <Link
            href="/fr/contact"
            className="group mt-7 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-[14px] font-medium text-[#0D2623] transition-all duration-300 hover:bg-[#91DBD3]"
          >
            Prendre rendez-vous
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      <p className="rc-sect mt-12 border-t border-[#E7DFD6] pt-6 text-[12px] leading-relaxed text-[#7B7066]">
        {MENTION_FINALE}
      </p>
    </>
  );
}

const Titre = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[#2D6D68]">{children}</h3>
);
