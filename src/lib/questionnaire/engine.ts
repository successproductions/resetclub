/**
 * Bloc 4 — moteur de calcul du Questionnaire Profil RESET CLUB™ v2.0.
 *
 * RÈGLE D'ARCHITECTURE — NON NÉGOCIABLE
 * Le calcul des scores, le classement et l'affectation du protocole sont
 * réalisés ici, par du code déterministe, jamais par un modèle de langage.
 * Deux clientes identiques doivent obtenir exactement le même profil.
 *
 * L'ordre des dix étapes n'est pas modifiable : l'éligibilité précède toujours
 * le scoring, la correction de tendance précède toujours le classement final.
 */

import type {
  Fiabilite,
  ItemEligibilite,
  ItemScore,
  Profil,
  QuestionnaireInput,
  RangProfil,
  Resultat,
  ScoresParProfil,
  StatutProfil,
} from '@/types/questionnaire';
import { STACKS } from './stacks';

/** Ordre fixe de départage, dernier recours du classement. */
export const ORDRE: readonly Profil[] = ['DRAIN', 'CORTISOL', 'METABOLIQUE', 'DIGEST'];

export const SCORE_MAX_PROFIL = 24;
export const SCORE_MAX_ENERGIE = 15;

/** Bloc 2 — seuils d'expression, appliqués après modulation. */
const SEUIL_EXPRESSION = 8;
const SEUIL_NET = 16;
/** Bloc 2 — écart minimal pour une dominante nette. */
const ECART_DOMINANCE_NETTE = 5;
/** Bloc 2 — plafond de modulation par profil. */
const PLAFOND_MODULATION = 4;

/** Étape 5 — seuil d'expression, appliqué après modulation. */
const statutDe = (v: number): StatutProfil =>
  v <= 7 ? 'non_exprime' : v <= 15 ? 'modere' : 'net';

export function evaluerProfil(input: QuestionnaireInput): Resultat {
  // ÉTAPE 1 — ÉLIGIBILITÉ (bloquante, avant tout calcul)
  const bloquants = (Object.entries(input.eligibilite) as [ItemEligibilite, boolean][])
    .filter(([, v]) => v === true)
    .map(([k]) => k);

  if (bloquants.length > 0) {
    return {
      eligibilite: 'a_orienter',
      motifs: bloquants,
      scores: null,
      classement: null,
      protocole: null,
    };
  }

  const r = input.reponses;

  // ÉTAPE 2 — SCORES BRUTS (questions signature pondérées ×2)
  const s: ScoresParProfil = {
    DRAIN: r.D1 * 2 + r.D2 * 2 + r.D3 + r.D4 + r.D5 + r.D6,
    CORTISOL: r.C1 * 2 + r.C2 * 2 + r.C3 + r.C4 + r.C5 + r.C6,
    METABOLIQUE: r.M1 * 2 + r.M2 * 2 + r.M3 + r.M4 + r.M5 + r.M6,
    DIGEST: r.G1 * 2 + r.G2 * 2 + r.G3 + r.G4 + r.G5 + r.G6,
  };
  const energie = r.E1 + r.E2 + r.E3 + r.E4 + r.E5;
  const brut: ScoresParProfil = { ...s };

  // ÉTAPE 3 — MODULATEURS DE CONTEXTE (plafond +4 par profil)
  const c = input.contexte;
  const mod: ScoresParProfil = { DRAIN: 0, CORTISOL: 0, METABOLIQUE: 0, DIGEST: 0 };

  if (c.A3_sommeil === 'moins_de_5') mod.CORTISOL += 3;
  else if (c.A3_sommeil === '5-6') mod.CORTISOL += 2;

  if (c.A5_eau === 'moins_1L') mod.DRAIN += 2;
  else if (c.A5_eau === '1-1.5L') mod.DRAIN += 1;

  if (c.A4_activite === 'aucune') mod.METABOLIQUE += 2;
  else if (c.A4_activite === '1_fois') mod.METABOLIQUE += 1;

  if (c.A9_antibiotiques_6m === true) mod.DIGEST += 1;

  // A2 ne donne aucun point : le statut hormonal est un contexte, pas un symptôme.
  for (const k of ORDRE) {
    s[k] = Math.min(SCORE_MAX_PROFIL, s[k] + Math.min(PLAFOND_MODULATION, mod[k]));
  }

  // ÉTAPE 4 — DÉTECTION DES RÉPONSES UNIFORMES
  //
  // ÉCART ASSUMÉ PAR RAPPORT AU PSEUDO-CODE DU BLOC 4 : le document teste
  // `items.every(v => v === items[0])`, ce qui capture aussi le cas « 29 réponses
  // à 0 ». Or le cas de test 3 du Bloc 9 attend pour ce cas une fiabilité
  // « non concluante » via l'Étape 8, pas « insuffisante ». Les deux cas de test
  // 2 et 3 ne peuvent passer simultanément qu'en excluant la valeur 0 ici : une
  // cliente qui répond « Jamais » partout n'a pas un biais de réponse, elle n'a
  // simplement aucun terrain exprimé. À arbitrer avec la direction.
  const items = Object.values(r) as number[];
  const uniforme = items.every((v) => v === items[0]);
  if (uniforme && items[0] !== 0) {
    return {
      eligibilite: 'validee',
      fiabilite: 'insuffisante',
      classement: null,
      scores: s,
      action: 'reprendre_avec_praticienne',
    };
  }

  // ÉTAPE 6 — CLASSEMENT INITIAL
  //
  // Le comparateur du Bloc 4 mêle score et arbitrage dans un même `sort`, ce qui
  // le rend non transitif. On construit ici une clé de tri explicite — score
  // décroissant, puis AR1, puis AR2, puis ordre fixe — strictement équivalente
  // en cas d'égalité, mais déterministe quel que soit le moteur de tri.
  const cleDeTri = (k: Profil): [number, number, number, number] => [
    -s[k],
    input.arbitrage.AR1 === k ? 0 : 1,
    input.arbitrage.AR2 === k ? 0 : 1,
    ORDRE.indexOf(k),
  ];

  let rangs: Profil[] = [...ORDRE].sort((a, b) => {
    const ka = cleDeTri(a);
    const kb = cleDeTri(b);
    for (let i = 0; i < ka.length; i++) {
      if (ka[i] !== kb[i]) return ka[i] - kb[i];
    }
    return 0;
  });

  // ÉTAPE 7 — CORRECTION DE LA TENDANCE DE RÉPONSE
  // Traite la cliente qui coche « souvent » partout et produit quatre scores
  // indissociables. C'est le mécanisme qui casse le biais de sur-déclaration.
  const vals = ORDRE.map((k) => s[k]);
  const maxV = Math.max(...vals);
  const minV = Math.min(...vals);
  const tousEleves = vals.every((v) => v >= SEUIL_NET);
  const tropSerres = maxV - minV <= 3;
  let alerteTendance = false;

  if (tousEleves || tropSerres) {
    alerteTendance = true;
    const cible = input.arbitrage.AR1;
    if (s[cible] >= SEUIL_EXPRESSION) {
      rangs = [cible, ...rangs.filter((k) => k !== cible)];
    }
  }

  // ÉTAPE 8 — SEUIL : aucun profil exprimé
  if (s[rangs[0]] < SEUIL_EXPRESSION) {
    return {
      eligibilite: 'validee',
      scores: s,
      energie,
      profil_dominant: null,
      fiabilite: 'non_concluante',
      action: 'protocole_general_et_entretien',
    };
  }

  // ÉTAPE 9 — SÉQUENÇAGE (prime sur le classement)
  // On ne construit ni sur un terrain engorgé, ni sur un système nerveux saturé.
  const deux = [rangs[0], rangs[1]];
  let ouvrant: Profil = rangs[0];
  if (deux.includes('DRAIN')) ouvrant = 'DRAIN';
  else if (deux.includes('CORTISOL')) ouvrant = 'CORTISOL';

  const ecart = s[rangs[0]] - s[rangs[1]];
  const dominance = ecart >= ECART_DOMINANCE_NETTE ? 'nette' : 'mixte';

  // ÉTAPE 10 — INTENSITÉ, FIABILITÉ, INCOHÉRENCES
  const intensite = energie <= 5 ? 'normale' : energie <= 10 ? 'moderee' : 'reduite';

  let fiabilite: Fiabilite;
  if (alerteTendance) fiabilite = 'a_verifier';
  else if (ecart >= ECART_DOMINANCE_NETTE && s[rangs[0]] >= SEUIL_NET) fiabilite = 'elevee';
  else if (ecart >= ECART_DOMINANCE_NETTE) fiabilite = 'bonne';
  else fiabilite = 'moyenne';

  const incoherences: string[] = [];
  // Note : `energie_elevee_sans_profil` du Bloc 4 est structurellement
  // inatteignable ici — l'Étape 8 est sortie plus haut dès que rang 1 < 8. Le
  // cas est traité à l'Étape 8, où il correspond à la fiabilité non concluante.
  if (rangs.indexOf(input.arbitrage.AR1) >= 2) {
    incoherences.push('arbitrage_diverge_du_classement');
  }
  if (intensite === 'reduite' && ouvrant === 'METABOLIQUE') {
    incoherences.push('ne_pas_intensifier_malgre_profil_metabolique');
  }

  const classement: RangProfil[] = rangs.map((k, i) => ({
    rang: (i + 1) as 1 | 2 | 3 | 4,
    profil: k,
    score: s[k],
    statut: statutDe(s[k]),
  }));

  return {
    eligibilite: 'validee',
    scores_bruts: brut,
    modulateurs: mod,
    scores_finaux: s,
    energie,
    intensite_depart: intensite,
    classement,
    ecart_1_2: ecart,
    dominance,
    profil_ouvrant: ouvrant,
    sequencage_applique: ouvrant !== rangs[0],
    fiabilite,
    incoherences,
    stack: STACKS[ouvrant],
  };
}

/** Liste des 29 identifiants scorés, pour la validation d'entrée. */
export const ITEMS_SCORES: readonly ItemScore[] = [
  'D1', 'D2', 'D3', 'D4', 'D5', 'D6',
  'C1', 'C2', 'C3', 'C4', 'C5', 'C6',
  'M1', 'M2', 'M3', 'M4', 'M5', 'M6',
  'G1', 'G2', 'G3', 'G4', 'G5', 'G6',
  'E1', 'E2', 'E3', 'E4', 'E5',
];

export const ITEMS_ELIGIBILITE: readonly ItemEligibilite[] = [
  'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10',
];
