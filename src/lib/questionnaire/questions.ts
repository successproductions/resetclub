/**
 * Bloc 1 — les 50 items du questionnaire, dans l'ordre exact du document.
 * Les identifiants sont les clés du JSON : ils ne doivent jamais être modifiés.
 */

import type { ItemEligibilite, ItemScore, Profil } from '@/types/questionnaire';

export const DUREE_ESTIMEE_MINUTES = 5;

/** Échelle de réponse — identique pour les 29 questions scorées. */
export const ECHELLE = [
  { label: 'Jamais', valeur: 0 },
  { label: 'Parfois', valeur: 1 },
  { label: 'Souvent', valeur: 2 },
  { label: 'Très souvent', valeur: 3 },
] as const;

export interface ChoixContexte {
  valeur: string;
  label: string;
}

export interface QuestionContexte {
  id: keyof import('@/types/questionnaire').Contexte;
  question: string;
  choix: ChoixContexte[];
}

/** SECTION A · CONTEXTE — non scorée. Alimente les modulateurs. 9 items. */
export const SECTION_A: QuestionContexte[] = [
  {
    id: 'A1_age',
    question: 'Votre âge',
    choix: [
      { valeur: 'moins_de_30', label: 'Moins de 30 ans' },
      { valeur: '30-39', label: '30 – 39 ans' },
      { valeur: '40-49', label: '40 – 49 ans' },
      { valeur: '50-59', label: '50 – 59 ans' },
      { valeur: '60_et_plus', label: '60 ans et plus' },
    ],
  },
  {
    id: 'A2_cycles',
    question: 'Vos cycles',
    choix: [
      { valeur: 'reguliers', label: 'Réguliers' },
      { valeur: 'irreguliers', label: 'Irréguliers' },
      { valeur: 'transition', label: 'Période de transition' },
      { valeur: 'arretes', label: "Arrêtés depuis plus d'un an" },
      { valeur: 'je_ne_sais_pas', label: 'Je ne sais pas' },
    ],
  },
  {
    id: 'A3_sommeil',
    question: 'Vos heures de sommeil par nuit',
    choix: [
      { valeur: 'moins_de_5', label: 'Moins de 5 h' },
      { valeur: '5-6', label: '5 à 6 h' },
      { valeur: '6-7', label: '6 à 7 h' },
      { valeur: '7-8', label: '7 à 8 h' },
      { valeur: 'plus_de_8', label: 'Plus de 8 h' },
    ],
  },
  {
    id: 'A4_activite',
    question: 'Votre activité physique par semaine',
    choix: [
      { valeur: 'aucune', label: 'Aucune' },
      { valeur: '1_fois', label: '1 fois' },
      { valeur: '2-3_fois', label: '2 à 3 fois' },
      { valeur: '4_fois_et_plus', label: '4 fois et plus' },
    ],
  },
  {
    id: 'A5_eau',
    question: "Votre consommation d'eau par jour",
    choix: [
      { valeur: 'moins_1L', label: "Moins d'1 L" },
      { valeur: '1-1.5L', label: '1 à 1,5 L' },
      { valeur: '1.5-2L', label: '1,5 à 2 L' },
      { valeur: 'plus_2L', label: 'Plus de 2 L' },
    ],
  },
  {
    id: 'A6_traitement',
    question: 'Prenez-vous un traitement médical régulier ?',
    choix: [
      { valeur: 'oui', label: 'Oui' },
      { valeur: 'non', label: 'Non' },
    ],
  },
  {
    id: 'A7_complements',
    question: 'Prenez-vous des compléments alimentaires ?',
    choix: [
      { valeur: 'oui', label: 'Oui' },
      { valeur: 'non', label: 'Non' },
    ],
  },
  {
    id: 'A8_poids_12m',
    question: 'Votre poids sur les 12 derniers mois',
    choix: [
      { valeur: 'stable', label: 'Stable' },
      { valeur: 'en_hausse', label: 'En hausse' },
      { valeur: 'en_baisse', label: 'En baisse' },
      { valeur: 'variable', label: 'Il varie beaucoup' },
    ],
  },
  {
    id: 'A9_antibiotiques_6m',
    question: 'Avez-vous pris des antibiotiques dans les 6 derniers mois ?',
    choix: [
      { valeur: 'oui', label: 'Oui' },
      { valeur: 'non', label: 'Non' },
    ],
  },
];

export interface QuestionEligibilite {
  id: ItemEligibilite;
  question: string;
}

/**
 * SECTION B · ÉLIGIBILITÉ — non scorée, bloquante.
 *
 * ⚠️ RÉDACTION À VALIDER PAR LA DIRECTION. Le document de spécification v2.0
 * référence B1 à B10 dans le schéma d'entrée (Bloc 3), dans l'Étape 1 de
 * l'algorithme (Bloc 4), dans le prompt de l'agent (Bloc 6, cas particulier B4)
 * et dans la recette (Bloc 9), mais ne contient pas leur libellé. Les dix
 * formulations ci-dessous sont reconstituées à partir des seuls éléments donnés
 * par le document — le récapitulatif des deltas cite les trois items ajoutés en
 * v2 : anticoagulants, épilepsie, diabète insulinodépendant — et des
 * contre-indications usuelles des protocoles du centre (pressothérapie,
 * lipocavitation, onde de choc, Emtone, LED).
 *
 * B4 déclenche un traitement particulier côté agent : aucun chiffre, aucun
 * objectif de poids, aucune recommandation alimentaire.
 */
export const SECTION_B: QuestionEligibilite[] = [
  { id: 'B1', question: 'Êtes-vous enceinte, ou allaitez-vous actuellement ?' },
  { id: 'B2', question: "Suivez-vous un traitement contre un cancer, ou en avez-vous suivi un au cours des cinq dernières années ?" },
  { id: 'B3', question: 'Une maladie cardiaque, rénale ou hépatique a-t-elle été diagnostiquée chez vous ?' },
  { id: 'B4', question: "Avez-vous vécu, aujourd'hui ou par le passé, un trouble du comportement alimentaire ?" },
  { id: 'B5', question: 'Avez-vous déjà eu une phlébite, une thrombose ou un trouble de la coagulation ?' },
  { id: 'B6', question: 'Prenez-vous un traitement anticoagulant ?' },
  { id: 'B7', question: "Êtes-vous concernée par l'épilepsie ?" },
  { id: 'B8', question: 'Êtes-vous concernée par un diabète insulinodépendant ?' },
  { id: 'B9', question: 'Portez-vous un pacemaker, un implant électronique ou un implant métallique ?' },
  { id: 'B10', question: 'Avez-vous subi une intervention chirurgicale importante au cours des six derniers mois ?' },
];

export interface QuestionScoree {
  id: ItemScore;
  enonce: string;
  /** Question signature : comptée double dans le score du profil. */
  signature?: true;
}

export interface SectionScoree {
  cle: Profil | 'ENERGIE';
  numero: number;
  titre: string;
  sousTitre: string;
  items: QuestionScoree[];
}

export const SECTIONS_SCOREES: SectionScoree[] = [
  {
    cle: 'DRAIN',
    numero: 1,
    titre: 'Circulation',
    sousTitre: 'Rétention, légèreté',
    items: [
      { id: 'D1', enonce: "Mes jambes sont lourdes ou gonflées en fin de journée, alors qu'elles vont mieux le matin", signature: true },
      { id: 'D2', enonce: 'Je garde la marque des chaussettes, des bagues ou des coutures de vêtements', signature: true },
      { id: 'D3', enonce: 'Mon visage, mes doigts ou mes chevilles paraissent gonflés selon les jours' },
      { id: 'D4', enonce: "Mon poids varie de plus d'un kilo d'un jour à l'autre sans que j'aie changé quoi que ce soit" },
      { id: 'D5', enonce: 'La peau de mes cuisses ou de mes hanches a un aspect capitonné' },
      { id: 'D6', enonce: 'La chaleur, les voyages en avion ou une longue station debout aggravent nettement mon état' },
    ],
  },
  {
    cle: 'CORTISOL',
    numero: 2,
    titre: 'Récupération',
    sousTitre: 'Charge nerveuse, sommeil',
    items: [
      { id: 'C1', enonce: 'Je me sens fatiguée mais incapable de me poser : le corps est épuisé, la tête continue de tourner', signature: true },
      { id: 'C2', enonce: 'Je me réveille la nuit, souvent en seconde partie de nuit, et je peine à me rendormir', signature: true },
      { id: 'C3', enonce: 'Je me réveille fatiguée même après une nuit complète' },
      { id: 'C4', enonce: 'Je me sens tendue, sous pression ou en alerte la plupart du temps' },
      { id: 'C5', enonce: "Le soir, après une journée difficile, je grignote alors que je n'ai pas faim" },
      { id: 'C6', enonce: 'Ce que je stocke se concentre sur le ventre, alors que mes bras et mes jambes changent peu' },
    ],
  },
  {
    cle: 'METABOLIQUE',
    numero: 3,
    titre: 'Énergie',
    sousTitre: 'Flexibilité, stockage',
    items: [
      { id: 'M1', enonce: "J'ai besoin de sucre ou de féculents pour tenir dans la journée, en dehors des repas", signature: true },
      { id: 'M2', enonce: 'Sauter un repas me rend irritable, tremblante ou incapable de me concentrer', signature: true },
      { id: 'M3', enonce: "Je perds difficilement, et je reprends vite ce que j'ai perdu" },
      { id: 'M4', enonce: 'Je me sens lourde, somnolente ou dans le brouillard dans l’heure qui suit un repas' },
      { id: 'M5', enonce: "J'ai de nouveau faim moins de trois heures après un vrai repas" },
      { id: 'M6', enonce: 'Mon tour de taille a augmenté ces dernières années plus que le reste de ma silhouette' },
    ],
  },
  {
    cle: 'DIGEST',
    numero: 4,
    titre: 'Digestion',
    sousTitre: 'Assimilation, confort',
    items: [
      { id: 'G1', enonce: 'Mon ventre est plat le matin et gonfle progressivement au fil de la journée', signature: true },
      { id: 'G2', enonce: "Certains aliments me gênent sans que j'arrive à identifier lesquels", signature: true },
      { id: 'G3', enonce: 'Je suis ballonnée ou inconfortable après les repas' },
      { id: 'G4', enonce: 'Mon transit est lent, irrégulier ou imprévisible' },
      { id: 'G5', enonce: 'Ma peau réagit : rougeurs, imperfections, sensibilité' },
      { id: 'G6', enonce: "J'ai des gaz, des bruits ou des gargouillements gênants" },
    ],
  },
  {
    cle: 'ENERGIE',
    numero: 5,
    titre: 'Vitalité',
    sousTitre: 'Indicateur transversal',
    items: [
      { id: 'E1', enonce: "Je manque d'énergie au quotidien" },
      { id: 'E2', enonce: "J'ai une sensation de brouillard mental ou du mal à me concentrer" },
      { id: 'E3', enonce: 'Je manque de motivation pour bouger' },
      { id: 'E4', enonce: 'Je récupère mal : une journée intense me coûte plusieurs jours' },
      { id: 'E5', enonce: "Je dois puiser sur mes réserves pour faire ce que je faisais facilement il y a deux ans" },
    ],
  },
];

export interface ChoixArbitrage {
  label: string;
  profil: Profil;
}

/**
 * SECTION 6 · ARBITRAGE — non scorée, choix unique obligatoire.
 * Section ipsative : la cliente ne peut pas tout choisir, elle doit hiérarchiser.
 * C'est le mécanisme qui casse le biais de sur-déclaration.
 */
export const ARBITRAGE: {
  id: 'AR1' | 'AR2';
  question: string;
  choix: ChoixArbitrage[];
}[] = [
  {
    id: 'AR1',
    question:
      'Si vous ne pouviez changer qu’une seule chose dans les trois prochains mois, ce serait :',
    choix: [
      { label: 'Me sentir plus légère, moins gonflée', profil: 'DRAIN' },
      { label: 'Retrouver un vrai sommeil et me sentir plus calme', profil: 'CORTISOL' },
      { label: 'Relancer un corps qui ne répond plus comme avant', profil: 'METABOLIQUE' },
      { label: 'Un ventre confortable et une digestion tranquille', profil: 'DIGEST' },
    ],
  },
  {
    id: 'AR2',
    question: 'Le signe qui vous gêne le plus au quotidien :',
    choix: [
      { label: 'Lourdeur, gonflement, jambes', profil: 'DRAIN' },
      { label: 'Tension, sommeil, agitation', profil: 'CORTISOL' },
      { label: 'Prise de poids, coups de barre', profil: 'METABOLIQUE' },
      { label: 'Ballonnement, ventre qui gonfle', profil: 'DIGEST' },
    ],
  },
];

export const NB_ITEMS_SCORES = SECTIONS_SCOREES.reduce((n, s) => n + s.items.length, 0);
export const NB_ITEMS_TOTAL =
  SECTION_A.length + SECTION_B.length + NB_ITEMS_SCORES + ARBITRAGE.length;
