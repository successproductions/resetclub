/**
 * Bloc 8 — rédaction destinée à la cliente.
 *
 * Aucun score. Aucun nom de code de profil. Aucun indice de fiabilité. Aucun
 * terme technique non expliqué. Les formulations ci-dessous sont celles
 * autorisées par le document : elles ne s'improvisent pas côté interface.
 */

import type { Intensite, Profil } from '@/types/questionnaire';

/** Bloc 8 — traduction des quatre profils en langage cliente. */
export const FORMULATION_PROFIL: Record<Profil, string> = {
  DRAIN:
    'Votre corps semble avoir besoin, en priorité, de retrouver de la circulation et de la légèreté.',
  CORTISOL:
    'Votre corps semble avoir besoin, en priorité, de récupérer et de retrouver un vrai repos.',
  METABOLIQUE:
    "Votre corps semble avoir besoin, en priorité, de retrouver de la souplesse dans la façon dont il gère son énergie.",
  DIGEST:
    'Votre corps semble avoir besoin, en priorité, de retrouver un confort digestif régulier.',
};

/** Titre court d'accompagnement, sans nom de code. */
export const TITRE_PROFIL: Record<Profil, string> = {
  DRAIN: 'Circulation et légèreté',
  CORTISOL: 'Récupération et repos',
  METABOLIQUE: 'Souplesse énergétique',
  DIGEST: 'Confort digestif',
};

/**
 * Section 3 du rapport cliente — trois manifestations concrètes, toujours au
 * conditionnel. Jamais d'affirmation d'état.
 */
export const MANIFESTATIONS: Record<Profil, string[]> = {
  DRAIN: [
    'Des jambes qui pèsent en fin de journée, alors que le matin tout va bien.',
    "Une silhouette qui change d'un jour à l'autre sans raison apparente.",
    "Une sensibilité marquée à la chaleur, aux longs trajets ou à la station debout.",
  ],
  CORTISOL: [
    "Une fatigue qui n'empêche pas la tête de continuer à tourner.",
    'Des réveils en seconde partie de nuit, avec un rendormissement difficile.',
    "Une sensation d'être en alerte, même dans les moments calmes.",
  ],
  METABOLIQUE: [
    "Un besoin de sucre ou de féculents pour tenir jusqu'au repas suivant.",
    'Des coups de barre dans l’heure qui suit un repas.',
    "Une faim qui revient bien avant l'heure attendue.",
  ],
  DIGEST: [
    "Un ventre plat au réveil qui se tend au fil de la journée.",
    'Des aliments qui gênent sans qu’on puisse dire lesquels.',
    'Un transit qui manque de régularité.',
  ],
};

/** Section 4 du rapport cliente — deux leviers, une phrase chacun. */
export const LEVIERS: Record<Profil, [string, string]> = {
  DRAIN: [
    'Nous commencerions par relancer la circulation, en ouverture de chaque séance.',
    "L'hydratation deviendrait un levier de travail à part entière, pas une consigne de plus.",
  ],
  CORTISOL: [
    'La priorité serait de redonner au système nerveux de vraies fenêtres de récupération.',
    'Nous installerions un rythme de sommeil avant toute forme de stimulation.',
  ],
  METABOLIQUE: [
    "Nous chercherions d'abord à retrouver de la stabilité dans la journée, sans à-coups.",
    'La protection musculaire serait intégrée dès les premières semaines.',
  ],
  DIGEST: [
    'Nous commencerions par apaiser le confort digestif, avant toute autre étape.',
    'Le rythme des repas serait notre premier point de travail, plutôt que leur contenu.',
  ],
};

/** Nuance de la section 4 selon l'intensité de départ (Bloc 2, indice énergie). */
export const NOTE_INTENSITE: Record<Intensite, string | null> = {
  normale: null,
  moderee:
    'Nous intégrerions de la récupération dès les premières séances, plutôt que de la garder pour plus tard.',
  reduite:
    "Nous démarrerions en intensité basse, quel que soit le point de départ, avec un point d'étape à trois semaines.",
};

/** Section 5 — la prochaine étape. */
export const PROCHAINE_ETAPE = {
  titre: 'La prochaine étape',
  texte:
    'Nous vous proposons un rendez-vous bilan au centre : mesure de composition corporelle et construction de votre protocole avec la praticienne.',
} as const;

/**
 * Section 6 — mention finale obligatoire.
 * À REPRODUIRE SANS AUCUNE MODIFICATION. Cette constante ne doit jamais être
 * interpolée, reformulée, tronquée ni traduite.
 */
export const MENTION_FINALE =
  "Ce questionnaire est un outil d'orientation bien-être, fondé sur vos réponses. Il ne constitue ni un diagnostic, ni un avis médical. Il ne remplace ni un bilan biologique, ni l'avis de votre médecin. Aucun traitement en cours ne doit être modifié ou interrompu sur la base de ce document.";

/** Bloc 6 — message unique du cas « à orienter ». Aucun score, aucun profil. */
export const MESSAGE_A_ORIENTER =
  'Merci pour vos réponses. Avant de vous proposer un protocole, nous souhaitons échanger avec vous et, selon les cas, recueillir l’avis de votre médecin. Notre équipe vous recontacte.';

/** Sortie « aucun profil exprimé » (Étape 8) et « réponses uniformes » (Étape 4). */
export const MESSAGE_SANS_PROFIL =
  "Vos réponses ne font ressortir aucune priorité nette. Ce n'est pas un mauvais résultat : cela signifie simplement que l'échange au centre et la mesure de composition corporelle nous en diront davantage que ce questionnaire.";

export const MESSAGE_A_REPRENDRE =
  "Vos réponses se ressemblent trop pour être interprétées avec justesse. Nous reprendrons le questionnaire avec la praticienne, tranquillement, lors de votre rendez-vous.";

/**
 * Bloc 6 — mots définitivement proscrits en sortie cliente. Le script
 * `scripts/test-questionnaire.ts` vérifie qu'aucun n'apparaît dans ce fichier.
 */
export const MOTS_PROSCRITS = [
  'diagnostic',
  'pathologie',
  'syndrome',
  'maladie',
  'ménopause',
  'menopause',
  'carence',
  'traiter',
  'guérir',
  'guerir',
  'amincissement',
  'minceur',
  'toxines',
  'encrassement',
  'détox',
  'detox',
] as const;

/**
 * Règle de séquençage (Étape 9) — explication donnée à la cliente lorsque le
 * parcours ne s'ouvre pas sur son terrain dominant. On ne construit ni sur un
 * terrain engorgé, ni sur un système nerveux saturé : la cliente doit
 * comprendre ce décalage plutôt que le subir.
 */
export const AMORCE: Record<Profil, string> = {
  DRAIN:
    "avant tout le reste, nous aurions besoin de relancer la circulation, sinon le travail engagé porterait moins.",
  CORTISOL:
    "avant tout le reste, nous aurions besoin de vous redonner de la récupération, sinon le travail engagé coûterait plus qu'il ne rapporterait.",
  METABOLIQUE:
    "nous commencerions par redonner de la stabilité à vos journées, pour que la suite s'installe sur un terrain plus régulier.",
  DIGEST:
    "nous commencerions par apaiser le confort digestif, pour que le reste soit mieux assimilé.",
};
