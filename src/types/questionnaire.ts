/**
 * Types du Questionnaire Profil RESET CLUB™ — spécification v2.0.
 *
 * Les identifiants (A1, B1, D1…) sont les clés du JSON échangé avec le moteur :
 * ils ne doivent jamais être modifiés. Toute renommage casse la recette (Bloc 9).
 */

export type Profil = 'DRAIN' | 'CORTISOL' | 'METABOLIQUE' | 'DIGEST';

/** Échelle de réponse unique des 29 questions scorées : Jamais → Très souvent. */
export type Valeur = 0 | 1 | 2 | 3;

export type StatutProfil = 'non_exprime' | 'modere' | 'net';
export type Intensite = 'normale' | 'moderee' | 'reduite';
export type Dominance = 'nette' | 'mixte';
export type Fiabilite =
  | 'elevee'
  | 'bonne'
  | 'moyenne'
  | 'a_verifier'
  | 'non_concluante'
  | 'incoherente'
  | 'insuffisante';

export type ItemDrain = 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6';
export type ItemCortisol = 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6';
export type ItemMetabolique = 'M1' | 'M2' | 'M3' | 'M4' | 'M5' | 'M6';
export type ItemDigest = 'G1' | 'G2' | 'G3' | 'G4' | 'G5' | 'G6';
export type ItemEnergie = 'E1' | 'E2' | 'E3' | 'E4' | 'E5';

/** Les 29 items scorés, dans l'ordre du questionnaire. */
export type ItemScore =
  | ItemDrain
  | ItemCortisol
  | ItemMetabolique
  | ItemDigest
  | ItemEnergie;

export type ItemEligibilite =
  | 'B1' | 'B2' | 'B3' | 'B4' | 'B5'
  | 'B6' | 'B7' | 'B8' | 'B9' | 'B10';

export interface Contexte {
  A1_age: 'moins_de_30' | '30-39' | '40-49' | '50-59' | '60_et_plus';
  A2_cycles: 'reguliers' | 'irreguliers' | 'transition' | 'arretes' | 'je_ne_sais_pas';
  A3_sommeil: 'moins_de_5' | '5-6' | '6-7' | '7-8' | 'plus_de_8';
  A4_activite: 'aucune' | '1_fois' | '2-3_fois' | '4_fois_et_plus';
  A5_eau: 'moins_1L' | '1-1.5L' | '1.5-2L' | 'plus_2L';
  A6_traitement: boolean;
  A7_complements: boolean;
  A8_poids_12m: 'stable' | 'en_hausse' | 'en_baisse' | 'variable';
  A9_antibiotiques_6m: boolean;
}

export interface DonneesCentre {
  tanita_disponible: boolean;
  masse_hydrique: number | null;
  masse_musculaire: number | null;
  graisse_viscerale: number | null;
  masse_grasse_pct: number | null;
}

/** Bloc 3 — schéma JSON d'entrée. Toutes les clés sont obligatoires. */
export interface QuestionnaireInput {
  client_id: string;
  date_soumission: string;
  contexte: Contexte;
  eligibilite: Record<ItemEligibilite, boolean>;
  reponses: Record<ItemScore, Valeur>;
  arbitrage: { AR1: Profil; AR2: Profil };
  donnees_centre: DonneesCentre;
}

export type ScoresParProfil = Record<Profil, number>;

export interface RangProfil {
  rang: 1 | 2 | 3 | 4;
  profil: Profil;
  score: number;
  statut: StatutProfil;
}

/** Sortie « à orienter » : aucun score n'est calculé (Étape 1, bloquante). */
export interface ResultatAOrienter {
  eligibilite: 'a_orienter';
  motifs: ItemEligibilite[];
  scores: null;
  classement: null;
  protocole: null;
}

/** Sortie « réponses uniformes » : aucun classement n'est produit (Étape 4). */
export interface ResultatUniforme {
  eligibilite: 'validee';
  fiabilite: 'insuffisante';
  classement: null;
  scores: ScoresParProfil;
  action: 'reprendre_avec_praticienne';
}

/** Sortie « aucun profil exprimé » : rang 1 sous le seuil de 8 (Étape 8). */
export interface ResultatNonConcluant {
  eligibilite: 'validee';
  scores: ScoresParProfil;
  energie: number;
  profil_dominant: null;
  fiabilite: 'non_concluante';
  action: 'protocole_general_et_entretien';
}

/** Bloc 5 — schéma JSON de sortie. Unique entrée de l'agent de rédaction. */
export interface ResultatComplet {
  eligibilite: 'validee';
  scores_bruts: ScoresParProfil;
  modulateurs: ScoresParProfil;
  scores_finaux: ScoresParProfil;
  energie: number;
  intensite_depart: Intensite;
  classement: RangProfil[];
  ecart_1_2: number;
  dominance: Dominance;
  profil_ouvrant: Profil;
  /** Vrai quand la règle de séquençage a déclassé le rang 1 (Bloc 7, section 3). */
  sequencage_applique: boolean;
  fiabilite: Fiabilite;
  incoherences: string[];
  stack: string[];
}

export type Resultat =
  | ResultatAOrienter
  | ResultatUniforme
  | ResultatNonConcluant
  | ResultatComplet;

export const estAOrienter = (r: Resultat): r is ResultatAOrienter =>
  r.eligibilite === 'a_orienter';

export const estComplet = (r: Resultat): r is ResultatComplet =>
  r.eligibilite === 'validee' && 'classement' in r && Array.isArray(r.classement);
