'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { ArrowLeft, X } from 'lucide-react';
import type {
  Contexte,
  ItemEligibilite,
  ItemScore,
  Profil,
  QuestionnaireInput,
  Resultat,
  Valeur,
} from '@/types/questionnaire';
import {
  ARBITRAGE,
  ECHELLE,
  SECTION_A,
  SECTION_B,
  SECTIONS_SCOREES,
} from '@/lib/questionnaire/questions';
import { evaluerProfil } from '@/lib/questionnaire/engine';
import ProgressRail, { type Chapitre } from './ProgressRail';
import OptionCard from './OptionCard';
import QuizIntro from './QuizIntro';
import IdentityStep, { type Identite } from './IdentityStep';
import ComputingScreen from './ComputingScreen';
import ResultView from './ResultView';

const CLE_BROUILLON = 'rc-questionnaire-v2';

type Ecran =
  | { kind: 'identite'; chapitre: 'VOUS' }
  | { kind: 'contexte'; chapitre: 'CONTEXTE'; index: number }
  | { kind: 'eligibilite'; chapitre: 'SANTE'; index: number }
  | { kind: 'score'; chapitre: string; section: number; index: number }
  | { kind: 'arbitrage'; chapitre: 'PRIORITES'; index: number };

interface Brouillon {
  identite: Identite;
  contexte: Partial<Record<keyof Contexte, string>>;
  eligibilite: Partial<Record<ItemEligibilite, boolean>>;
  reponses: Partial<Record<ItemScore, Valeur>>;
  arbitrage: Partial<Record<'AR1' | 'AR2', Profil>>;
  curseur: number;
}

const BROUILLON_VIDE: Brouillon = {
  identite: { prenom: '', nom: '', email: '', telephone: '' },
  contexte: {},
  eligibilite: {},
  reponses: {},
  arbitrage: {},
  curseur: 0,
};

/** Construit la liste plate des écrans, dans l'ordre exact du document. */
function construireEcrans(): { ecrans: Ecran[]; chapitres: Chapitre[] } {
  const ecrans: Ecran[] = [{ kind: 'identite', chapitre: 'VOUS' }];

  SECTION_A.forEach((_, index) =>
    ecrans.push({ kind: 'contexte', chapitre: 'CONTEXTE', index }),
  );
  SECTION_B.forEach((_, index) =>
    ecrans.push({ kind: 'eligibilite', chapitre: 'SANTE', index }),
  );
  SECTIONS_SCOREES.forEach((sec, section) =>
    sec.items.forEach((_, index) =>
      ecrans.push({ kind: 'score', chapitre: sec.cle, section, index }),
    ),
  );
  ARBITRAGE.forEach((_, index) =>
    ecrans.push({ kind: 'arbitrage', chapitre: 'PRIORITES', index }),
  );

  const chapitres: Chapitre[] = [
    { cle: 'VOUS', label: 'Vous', taille: 1 },
    { cle: 'CONTEXTE', label: 'Contexte', taille: SECTION_A.length },
    { cle: 'SANTE', label: 'Santé', taille: SECTION_B.length },
    ...SECTIONS_SCOREES.map((s) => ({
      cle: s.cle,
      label: s.titre,
      taille: s.items.length,
    })),
    { cle: 'PRIORITES', label: 'Priorités', taille: ARBITRAGE.length },
  ];

  return { ecrans, chapitres };
}

export default function QuizRunner() {
  const { ecrans, chapitres } = useMemo(construireEcrans, []);

  const [phase, setPhase] = useState<'intro' | 'questions' | 'calcul' | 'resultat'>('intro');
  const [brouillon, setBrouillon] = useState<Brouillon>(BROUILLON_VIDE);
  const [resultat, setResultat] = useState<Resultat | null>(null);
  const [restaure, setRestaure] = useState(false);
  const carte = useRef<HTMLDivElement>(null);
  const enTransition = useRef(false);

  const curseur = brouillon.curseur;
  const ecran = ecrans[Math.min(curseur, ecrans.length - 1)];

  // ── Brouillon local : cinq minutes de réponses ne doivent pas disparaître
  //    sur un rechargement de page.
  useEffect(() => {
    try {
      const brut = localStorage.getItem(CLE_BROUILLON);
      if (brut) {
        const sauve = JSON.parse(brut) as Brouillon;
        if (sauve && typeof sauve.curseur === 'number') setBrouillon(sauve);
      }
    } catch {
      /* stockage indisponible : on repart d'un questionnaire vierge */
    }
    setRestaure(true);
  }, []);

  useEffect(() => {
    if (!restaure) return;
    try {
      localStorage.setItem(CLE_BROUILLON, JSON.stringify(brouillon));
    } catch {
      /* quota ou navigation privée : la perte du brouillon reste acceptable */
    }
  }, [brouillon, restaure]);

  // ── Animation d'entrée de chaque carte
  useEffect(() => {
    if (phase !== 'questions' || !carte.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.rc-q-head', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(
          '.rc-option, .rc-identity',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.055 },
          '-=0.28',
        );
    }, carte);
    return () => ctx.revert();
  }, [phase, curseur]);

  const avancer = useCallback(
    (majBrouillon?: Partial<Brouillon>) => {
      if (enTransition.current) return;
      enTransition.current = true;

      const suite = () => {
        setBrouillon((b) => ({ ...b, ...majBrouillon, curseur: b.curseur + 1 }));
        enTransition.current = false;
      };

      if (carte.current) {
        gsap.to(carte.current, {
          opacity: 0,
          y: -14,
          duration: 0.22,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(carte.current, { opacity: 1, y: 0 });
            suite();
          },
        });
      } else {
        suite();
      }
    },
    [],
  );

  const reculer = useCallback(() => {
    if (enTransition.current || curseur === 0) return;
    setBrouillon((b) => ({ ...b, curseur: Math.max(0, b.curseur - 1) }));
  }, [curseur]);

  // ── Soumission : le moteur tourne côté client pour l'affichage immédiat, et
  //    côté serveur pour la valeur qui part en base. Les deux exécutent le même
  //    code déterministe, donc produisent le même résultat.
  const soumettre = useCallback(
    async (b: Brouillon) => {
      const entree = construireEntree(b);
      setResultat(evaluerProfil(entree));
      setPhase('calcul');

      try {
        await fetch('/api/questionnaire', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identite: b.identite, entree }),
        });
      } catch (e) {
        // Une panne d'enregistrement ne doit jamais coûter le résultat à la
        // cliente : elle est journalisée, la restitution continue.
        console.error('Questionnaire : envoi impossible', e);
      }
    },
    [],
  );

  const repondre = useCallback(
    (maj: Partial<Brouillon>) => {
      const suivant = { ...brouillon, ...maj, curseur: curseur + 1 };
      if (curseur + 1 >= ecrans.length) {
        try {
          localStorage.removeItem(CLE_BROUILLON);
        } catch {
          /* sans conséquence */
        }
        setBrouillon(suivant);
        void soumettre(suivant);
        return;
      }
      avancer(maj);
    },
    [avancer, brouillon, curseur, ecrans.length, soumettre],
  );

  if (!restaure) return <div className="min-h-[100dvh] bg-white" />;

  if (phase === 'intro') {
    return <QuizIntro onStart={() => setPhase('questions')} />;
  }

  if (phase === 'calcul') {
    return <ComputingScreen onDone={() => setPhase('resultat')} />;
  }

  if (phase === 'resultat' && resultat) {
    return <ResultView resultat={resultat} prenom={brouillon.identite.prenom} />;
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#FBF8F4]">
      <header className="sticky top-0 z-20 border-b border-[#E7DFD6] bg-[#FBF8F4]/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={reculer}
            disabled={curseur === 0}
            aria-label="Question précédente"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E7DFD6] bg-white text-[#5B5148] transition-colors duration-200 hover:border-[#CBB9A7] disabled:opacity-35"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="min-w-0 flex-1">
            <ProgressRail chapitres={chapitres} indexCourant={curseur} />
          </div>
          <Link
            href="/fr"
            aria-label="Quitter le questionnaire"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E7DFD6] bg-white text-[#5B5148] transition-colors duration-200 hover:border-[#CBB9A7]"
          >
            <X size={16} />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center px-5 py-10 sm:px-8 sm:py-14">
        <div ref={carte} className="mx-auto w-full max-w-2xl">
          {ecran.kind === 'identite' && (
            <div className="rc-identity">
              <IdentityStep
                valeur={brouillon.identite}
                onSubmit={(identite) => repondre({ identite })}
              />
            </div>
          )}

          {ecran.kind === 'contexte' && (
            <QuestionContexte
              index={ecran.index}
              valeur={brouillon.contexte[SECTION_A[ecran.index].id]}
              onChoix={(v) =>
                repondre({
                  contexte: { ...brouillon.contexte, [SECTION_A[ecran.index].id]: v },
                })
              }
              position={`${ecran.index + 1} / ${SECTION_A.length}`}
            />
          )}

          {ecran.kind === 'eligibilite' && (
            <QuestionEligibilite
              index={ecran.index}
              valeur={brouillon.eligibilite[SECTION_B[ecran.index].id]}
              onChoix={(v) =>
                repondre({
                  eligibilite: { ...brouillon.eligibilite, [SECTION_B[ecran.index].id]: v },
                })
              }
              position={`${ecran.index + 1} / ${SECTION_B.length}`}
            />
          )}

          {ecran.kind === 'score' && (
            <QuestionScoree
              section={ecran.section}
              index={ecran.index}
              valeur={brouillon.reponses[SECTIONS_SCOREES[ecran.section].items[ecran.index].id]}
              onChoix={(v) =>
                repondre({
                  reponses: {
                    ...brouillon.reponses,
                    [SECTIONS_SCOREES[ecran.section].items[ecran.index].id]: v,
                  },
                })
              }
            />
          )}

          {ecran.kind === 'arbitrage' && (
            <QuestionArbitrage
              index={ecran.index}
              valeur={brouillon.arbitrage[ARBITRAGE[ecran.index].id]}
              onChoix={(v) =>
                repondre({
                  arbitrage: { ...brouillon.arbitrage, [ARBITRAGE[ecran.index].id]: v },
                })
              }
            />
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Écrans ───────────────────────────────────────────────────────────────────

function EnTete({
  eyebrow,
  question,
  aide,
}: {
  eyebrow: string;
  question: string;
  aide?: string;
}) {
  return (
    <div className="rc-q-head mb-9 text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#51B1AA]">
        {eyebrow}
      </p>
      <h2 className="mx-auto mt-4 max-w-xl text-[#0D2623]">
        {question}
      </h2>
      {aide && <p className="mt-3 text-[14px] text-[#7B7066]">{aide}</p>}
    </div>
  );
}

function QuestionContexte({
  index,
  valeur,
  onChoix,
  position,
}: {
  index: number;
  valeur?: string;
  onChoix: (v: string) => void;
  position: string;
}) {
  const q = SECTION_A[index];
  return (
    <>
      <EnTete eyebrow={`Contexte · ${position}`} question={q.question} />
      <div className="space-y-3">
        {q.choix.map((c) => (
          <OptionCard
            key={c.valeur}
            label={c.label}
            selectionne={valeur === c.valeur}
            onClick={() => onChoix(c.valeur)}
          />
        ))}
      </div>
    </>
  );
}

function QuestionEligibilite({
  index,
  valeur,
  onChoix,
  position,
}: {
  index: number;
  valeur?: boolean;
  onChoix: (v: boolean) => void;
  position: string;
}) {
  const q = SECTION_B[index];
  return (
    <>
      <EnTete
        eyebrow={`Santé · ${position}`}
        question={q.question}
        aide="Cette réponse nous sert uniquement à savoir si un échange préalable est nécessaire."
      />
      <div className="space-y-3">
        <OptionCard label="Oui" selectionne={valeur === true} onClick={() => onChoix(true)} />
        <OptionCard label="Non" selectionne={valeur === false} onClick={() => onChoix(false)} />
      </div>
    </>
  );
}

function QuestionScoree({
  section,
  index,
  valeur,
  onChoix,
}: {
  section: number;
  index: number;
  valeur?: Valeur;
  onChoix: (v: Valeur) => void;
}) {
  const sec = SECTIONS_SCOREES[section];
  const item = sec.items[index];
  return (
    <>
      <EnTete
        eyebrow={`${sec.titre} · ${index + 1} / ${sec.items.length}`}
        question={item.enonce}
        aide="En pensant aux trois derniers mois."
      />
      <div className="space-y-3">
        {ECHELLE.map((e) => (
          <OptionCard
            key={e.valeur}
            label={e.label}
            selectionne={valeur === e.valeur}
            onClick={() => onChoix(e.valeur)}
            ornement={<Jauge niveau={e.valeur} />}
          />
        ))}
      </div>
    </>
  );
}

/** Pastille de fréquence : quatre barres dont `niveau + 1` sont pleines. */
function Jauge({ niveau }: { niveau: number }) {
  return (
    <span className="flex items-end gap-[2px]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-current transition-opacity duration-200"
          style={{ height: 5 + i * 3, opacity: i <= niveau ? 1 : 0.22 }}
        />
      ))}
    </span>
  );
}

function QuestionArbitrage({
  index,
  valeur,
  onChoix,
}: {
  index: number;
  valeur?: Profil;
  onChoix: (v: Profil) => void;
}) {
  const q = ARBITRAGE[index];
  return (
    <>
      <EnTete
        eyebrow={`Priorités · ${index + 1} / ${ARBITRAGE.length}`}
        question={q.question}
        aide="Une seule réponse. C'est ce choix qui départage vos priorités."
      />
      <div className="space-y-3">
        {q.choix.map((c) => (
          <OptionCard
            key={c.profil}
            label={c.label}
            selectionne={valeur === c.profil}
            onClick={() => onChoix(c.profil)}
          />
        ))}
      </div>
    </>
  );
}

// ─── Assemblage du JSON d'entrée (Bloc 3) ─────────────────────────────────────

function construireEntree(b: Brouillon): QuestionnaireInput {
  const c = b.contexte;
  return {
    client_id: genererClientId(),
    date_soumission: new Date().toISOString(),
    contexte: {
      A1_age: c.A1_age,
      A2_cycles: c.A2_cycles,
      A3_sommeil: c.A3_sommeil,
      A4_activite: c.A4_activite,
      A5_eau: c.A5_eau,
      A6_traitement: c.A6_traitement === 'oui',
      A7_complements: c.A7_complements === 'oui',
      A8_poids_12m: c.A8_poids_12m,
      A9_antibiotiques_6m: c.A9_antibiotiques_6m === 'oui',
    } as Contexte,
    eligibilite: Object.fromEntries(
      SECTION_B.map((q) => [q.id, b.eligibilite[q.id] === true]),
    ) as Record<ItemEligibilite, boolean>,
    reponses: Object.fromEntries(
      SECTIONS_SCOREES.flatMap((s) => s.items).map((i) => [i.id, b.reponses[i.id] ?? 0]),
    ) as Record<ItemScore, Valeur>,
    arbitrage: {
      AR1: b.arbitrage.AR1 ?? 'DRAIN',
      AR2: b.arbitrage.AR2 ?? b.arbitrage.AR1 ?? 'DRAIN',
    },
    donnees_centre: {
      tanita_disponible: false,
      masse_hydrique: null,
      masse_musculaire: null,
      graisse_viscerale: null,
      masse_grasse_pct: null,
    },
  };
}

/** Format du document : RC-<année>-<4 chiffres>. */
function genererClientId(): string {
  const suffixe = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `RC-${new Date().getFullYear()}-${suffixe}`;
}
