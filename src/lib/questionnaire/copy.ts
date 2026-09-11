/**
 * Texte de la page de résultat, destiné à la cliente.
 *
 * SOURCE UNIQUE : RESET_CLUB_Pages_Resultat_Questionnaire.docx, transmis par la
 * direction. Ce document fait foi, y compris là où il s'écarte de la
 * spécification v2.0 — noms de code désormais affichés, ton affirmatif plutôt
 * que conditionnel, sections de détail supprimées. Rien n'est reformulé dans les
 * composants : tout le texte affiché vient d'ici.
 *
 * Le document couvre cinq écrans : les quatre profils et le profil équilibré.
 * Les deux cas qu'il ne couvre pas — éligibilité bloquante et réponses
 * uniformes — gardent un texte minimal plus bas dans ce fichier : le moteur n'y
 * produit aucun profil, il n'y a donc rien à nommer.
 *
 * Seule contrainte non négociable conservée : la mention finale, mot pour mot.
 */

import type { Profil } from '@/types/questionnaire';

/** En-tête commun aux cinq écrans de restitution. */
export const BRAVO = {
  titre: (prenom: string) => `Bravo ${prenom}.`,
  sousTitre: 'Vous venez de faire la première étape.',
  texte:
    "Comprendre comment votre corps fonctionne, c'est ce qui change tout. La plupart des femmes essaient de transformer leur corps sans jamais savoir ce qui bloque réellement. Vous, vous venez de le nommer.",
} as const;

/**
 * Page d'accueil du questionnaire.
 *
 * Texte fourni par la direction. Les corrections apportées sont purement
 * orthographiques — accents, accords, doublement de consonne — et sont listées
 * dans le message de commit : la voix reste celle de la direction.
 */
export const ACCUEIL = {
  eyebrow: 'Biohacking · Longévité',
  /** L'argument, en trois temps : le constat, la nuance, la promesse. */
  amorce: 'Avant de transformer un corps, il faut comprendre comment il fonctionne.',
  bascule: [
    'En réalité votre corps ne résiste pas.',
    "Il fonctionne juste autrement, et on ne vous l'a jamais renseigné.",
  ],
  mecanismes:
    'Rétention, cortisol, charge nerveuse, métabolisme, digestion, inflammation. Quatre façons très différentes de bloquer, et quatre profils différents. Ce questionnaire identifie le vôtre.',
  promesse: "Votre corps n'aura plus de secret pour vous.",
  reperes: ['5 minutes', '4 profils', 'Confidentiel'],
  cta: 'Je découvre mon profil',
  cadre:
    "Outil d'orientation bien-être. Ne constitue ni un diagnostic, ni un avis médical.",
} as const;

export const LABEL_PROFIL = 'Votre profil';
export const LABEL_QUATRE = 'Les quatre profils';
export const LIEN_DETAIL = 'Voir ma lecture détaillée';

/** Nom de code déposé, affiché au-dessus du libellé courant. */
export const CODE_PROFIL: Record<Profil, string> = {
  DRAIN: 'DRAIN™',
  CORTISOL: 'CORTISOL™',
  METABOLIQUE: 'MÉTABOLIQUE™',
  DIGEST: 'DIGEST™',
};

export const TITRE_PROFIL: Record<Profil, string> = {
  DRAIN: 'Circulation et légèreté',
  CORTISOL: 'Récupération et repos',
  METABOLIQUE: 'Souplesse énergétique',
  DIGEST: 'Confort digestif',
};

/** La phrase qui nomme le terrain, en deux temps. */
export const ACCROCHE: Record<Profil, string> = {
  DRAIN: "Votre corps ne stocke pas d'abord. Il retient.",
  CORTISOL: "Votre corps n'est pas fatigué par manque d'effort. Il est en alerte.",
  METABOLIQUE: "Votre corps n'a pas cessé de répondre. Il a perdu en souplesse.",
  DIGEST: 'Votre ventre ne gonfle pas au hasard. Il réagit.',
};

/** Ce que cela recouvre, puis la priorité qui en découle. */
export const LECTURE: Record<Profil, string> = {
  DRAIN:
    "Lourdeur en fin de journée, gonflement qui varie d'un jour à l'autre, silhouette qui change sans que rien n'ait changé. Votre priorité n'est pas de brûler — c'est de remettre en circulation.",
  CORTISOL:
    'Épuisée mais incapable de vous poser, réveils en seconde partie de nuit, ce qui se stocke se concentre sur le ventre. Votre priorité est de faire redescendre la pression — avant tout le reste.',
  METABOLIQUE:
    'Besoin de sucre pour tenir la journée, coups de barre après les repas, ce qui est perdu revient vite. Votre priorité est de lui réapprendre à puiser dans ses propres réserves.',
  DIGEST:
    "Plat le matin, gonflé le soir, des aliments qui gênent sans qu'on sache lesquels. Votre priorité est de retrouver une digestion tranquille — avant de travailler la silhouette.",
};

/** Cinquième écran du document : aucun terrain ne se détache. */
export const PROFIL_EQUILIBRE = {
  code: 'PROFIL ÉQUILIBRÉ',
  titre: 'Aucun terrain ne domine',
  accroche: "Aucun terrain ne domine nettement chez vous. C'est une bonne nouvelle.",
  lecture:
    'Votre protocole se construira à partir de votre objectif et des mesures réalisées au centre.',
} as const;

/** Bloc de bas de page, commun aux cinq écrans. */
export const AU_CENTRE = {
  titre: 'Ce qui vous attend au centre',
  texte:
    'Lors de votre rendez-vous, votre praticienne va approfondir cette première lecture. Composition corporelle, terrain minéral, entretien complet. Vous repartez avec votre bilan personnalisé et le protocole construit pour votre profil.',
  /** Variante sans profil désigné — le protocole n'est construit pour aucun terrain. */
  texteSansProfil:
    'Lors de votre rendez-vous, votre praticienne va approfondir cette première lecture. Composition corporelle, terrain minéral, entretien complet. Vous repartez avec votre bilan personnalisé et le protocole construit pour vous.',
  cta: 'Réserver mon Bilan Reset™',
} as const;

export const SIGNATURE = {
  ligne1: 'Hâte de vous rencontrer.',
  ligne2: "L'équipe Reset Club™",
} as const;

/**
 * Mention finale obligatoire.
 * À REPRODUIRE SANS AUCUNE MODIFICATION. Cette constante ne doit jamais être
 * interpolée, reformulée, tronquée ni traduite.
 */
export const MENTION_FINALE =
  "Ce questionnaire est un outil d'orientation bien-être, fondé sur vos réponses. Il ne constitue ni un diagnostic, ni un avis médical. Il ne remplace ni un bilan biologique, ni l'avis de votre médecin. Aucun traitement en cours ne doit être modifié ou interrompu sur la base de ce document.";

/**
 * Bloc 6 — message unique du cas « à orienter ». Aucun score, aucun profil.
 * Non couvert par le nouveau document : on ne félicite pas une cliente à qui
 * l'on demande d'abord un échange, et aucun profil ne peut lui être nommé.
 */
export const MESSAGE_A_ORIENTER =
  'Merci pour vos réponses. Avant de vous proposer un protocole, nous souhaitons échanger avec vous et, selon les cas, recueillir l’avis de votre médecin. Notre équipe vous recontacte.';

export const RASSURANCE_A_ORIENTER =
  'Vos réponses restent enregistrées. Vous n’avez rien à refaire : nous les reprendrons ensemble lors de l’échange.';

/** Réponses uniformes (Étape 4) — non couvert par le document. */
export const MESSAGE_A_REPRENDRE =
  'Vos réponses se ressemblent trop pour être interprétées avec justesse. Nous reprendrons le questionnaire avec la praticienne, tranquillement, lors de votre rendez-vous.';

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
