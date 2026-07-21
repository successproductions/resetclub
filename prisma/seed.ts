import { PrismaClient, TargetRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const DEMO_PASSWORDS = {
  client: 'ResetClient123!',
  employee: 'ResetEmployee123!',
};

const DEMO_VIMEO_VIDEOS = [
  {
    vimeoVideoId: '1204774711?h=64dce5d929',
    videoUrl: 'https://vimeo.com/1204774711/64dce5d929?fl=ml&fe=ec',
  },
  {
    vimeoVideoId: '1204774638?h=89b38ac11a',
    videoUrl: 'https://vimeo.com/1204774638/89b38ac11a?fl=ml&fe=ec',
  },
  {
    vimeoVideoId: '1204774640?h=1c2ef88ba9',
    videoUrl: 'https://vimeo.com/1204774640/1c2ef88ba9?fl=ml&fe=ec',
  },
  {
    vimeoVideoId: '1204774641?h=d5221c7b17',
    videoUrl: 'https://vimeo.com/1204774641/d5221c7b17?fl=ml&fe=ec',
  },
  {
    vimeoVideoId: '1204774639?h=23ac02490a',
    videoUrl: 'https://vimeo.com/1204774639/23ac02490a?fl=ml&fe=ec',
  },
  {
    vimeoVideoId: '1204774677?h=0d6602ff53',
    videoUrl: 'https://vimeo.com/1204774677/0d6602ff53?fl=ml&fe=ec',
  },
  {
    vimeoVideoId: '1171044018',
    videoUrl: 'https://vimeo.com/1171044018?fl=ip&fe=ec',
  },
];

const DEMO_USER_EMAILS = ['client.demo@resetclub.ma', 'employee.demo@resetclub.ma'];
const DEMO_FORMATION_SLUGS = [
  'academy-client',
  'academy-terapot',
  'parcours-client-reset-360',
  'parcours-employe-reset-club',
];

type ModuleBlueprint = {
  title: string;
  description: string;
  durationMinutes: number;
  lessonOne: string;
  lessonTwo: string;
  keyPractice: string;
  wrongPractice: string;
};

type QuizQuestionSeed = {
  questionText: string;
  explanation?: string;
  options: Array<{
    optionText: string;
    isCorrect: boolean;
  }>;
};

type LessonSeed = {
  title: string;
  description: string;
  durationSeconds: number;
  vimeoVideoId: string | null;
  videoUrl: string | null;
  resourcesUrl?: string;
  attachments?: Array<{
    title: string;
    fileUrl: string;
    fileType: string;
  }>;
};

type ModuleSeed = {
  title: string;
  description: string;
  durationMinutes: number;
  lessons: LessonSeed[];
  quiz?: {
    title: string;
    description: string;
    questions: QuizQuestionSeed[];
  };
};

type DemoFormation = {
  title: string;
  slug: string;
  description: string;
  targetRole: TargetRole;
  difficultyLevel: 'BEGINNER' | 'INTERMEDIATE';
  durationHours: number;
  thumbnailUrl: string;
  modules: ModuleSeed[];
};

const clientModuleBlueprints: ModuleBlueprint[] = [
  {
    title: 'Bienvenue et objectifs',
    description: 'Clarifier votre point de départ et définir une transformation réaliste.',
    durationMinutes: 45,
    lessonOne: 'Comprendre votre parcours RESET',
    lessonTwo: 'Définir un objectif mesurable',
    keyPractice: 'suivre un objectif simple chaque semaine',
    wrongPractice: "changer d'objectif tous les jours",
  },
  {
    title: 'Diagnostic personnel',
    description: 'Observer énergie, sommeil, stress et habitudes avant de commencer.',
    durationMinutes: 50,
    lessonOne: 'Lire vos signaux de départ',
    lessonTwo: 'Identifier vos freins principaux',
    keyPractice: 'noter les signaux importants sans jugement',
    wrongPractice: 'ignorer les signaux du corps',
  },
  {
    title: 'Mouvement intelligent',
    description: 'Activer le corps sans épuiser le système nerveux.',
    durationMinutes: 60,
    lessonOne: 'Activer le métabolisme en douceur',
    lessonTwo: 'Planifier les séances dans la semaine',
    keyPractice: 'choisir une routine compatible avec votre vie',
    wrongPractice: "forcer jusqu'à l'épuisement",
  },
  {
    title: 'Technologies RESET',
    description: 'Comprendre comment les technologies soutiennent la transformation.',
    durationMinutes: 55,
    lessonOne: 'Comprendre le rôle des technologies',
    lessonTwo: 'Relier sensations et progression',
    keyPractice: 'associer les séances aux objectifs personnels',
    wrongPractice: 'attendre un résultat sans régularité',
  },
  {
    title: 'Nutrition stable',
    description: 'Installer des repères alimentaires simples pour soutenir énergie et satiété.',
    durationMinutes: 70,
    lessonOne: 'Construire une assiette stable',
    lessonTwo: 'Éviter les extrêmes alimentaires',
    keyPractice: 'répéter des repas simples et équilibrés',
    wrongPractice: 'supprimer des familles alimentaires sans stratégie',
  },
  {
    title: 'Hydratation et récupération',
    description: 'Soutenir le corps entre les séances avec des gestes simples.',
    durationMinutes: 40,
    lessonOne: 'Hydratation utile au quotidien',
    lessonTwo: 'Récupérer sans culpabiliser',
    keyPractice: 'prévoir eau et temps de récupération',
    wrongPractice: 'ne jamais laisser le corps récupérer',
  },
  {
    title: 'Sommeil et énergie',
    description: 'Améliorer la qualité du sommeil pour soutenir les résultats.',
    durationMinutes: 55,
    lessonOne: 'Comprendre le lien sommeil-énergie',
    lessonTwo: 'Construire une routine du soir',
    keyPractice: 'stabiliser une routine de sommeil',
    wrongPractice: 'sacrifier le sommeil pour aller plus vite',
  },
  {
    title: 'Stress et système nerveux',
    description: 'Réguler le stress pour garder une transformation durable.',
    durationMinutes: 60,
    lessonOne: 'Reconnaître la surcharge nerveuse',
    lessonTwo: 'Utiliser des pauses régulatrices',
    keyPractice: 'utiliser une pause courte avant de réagir',
    wrongPractice: 'accumuler la pression sans pause',
  },
  {
    title: 'Habitudes anti-abandon',
    description: "Préparer les moments difficiles avant qu'ils arrivent.",
    durationMinutes: 65,
    lessonOne: 'Anticiper les semaines chargées',
    lessonTwo: 'Reprendre après un écart',
    keyPractice: 'avoir un plan minimum pour les jours difficiles',
    wrongPractice: 'abandonner après un écart',
  },
  {
    title: 'Suivi des progrès',
    description: 'Mesurer les bons indicateurs sans devenir obsédé par les chiffres.',
    durationMinutes: 50,
    lessonOne: 'Choisir les bons indicateurs',
    lessonTwo: 'Lire les progrès non visibles',
    keyPractice: 'suivre énergie, habitudes et constance',
    wrongPractice: "ne regarder qu'un seul chiffre",
  },
  {
    title: 'Maintien des résultats',
    description: 'Passer du programme à un mode de vie durable.',
    durationMinutes: 60,
    lessonOne: 'Consolider les acquis',
    lessonTwo: "Éviter l'effet retour en arrière",
    keyPractice: 'garder deux habitudes prioritaires',
    wrongPractice: 'arrêter toutes les routines après les premiers résultats',
  },
  {
    title: 'Plan personnel 30 jours',
    description: 'Construire un plan clair pour continuer après la formation.',
    durationMinutes: 75,
    lessonOne: 'Dessiner votre routine 30 jours',
    lessonTwo: 'Fixer vos prochains rendez-vous',
    keyPractice: "écrire un plan d'action court et réaliste",
    wrongPractice: 'repartir sans prochaine action',
  },
];

function buildModule(module: ModuleBlueprint, moduleIndex: number): ModuleSeed {
  const firstVideo = DEMO_VIMEO_VIDEOS[(moduleIndex * 2) % DEMO_VIMEO_VIDEOS.length];
  const secondVideo = DEMO_VIMEO_VIDEOS[(moduleIndex * 2 + 1) % DEMO_VIMEO_VIDEOS.length];

  return {
    title: module.title,
    description: module.description,
    durationMinutes: module.durationMinutes,
    lessons: [
      {
        title: module.lessonOne,
        description: `Objectif : comprendre ${module.keyPractice}.`,
        durationSeconds: 420 + moduleIndex * 20,
        vimeoVideoId: firstVideo.vimeoVideoId,
        videoUrl: firstVideo.videoUrl,
      },
      {
        title: module.lessonTwo,
        description: `Mise en pratique : éviter de ${module.wrongPractice}.`,
        durationSeconds: 390 + moduleIndex * 15,
        vimeoVideoId: secondVideo.vimeoVideoId,
        videoUrl: secondVideo.videoUrl,
      },
    ],
    quiz: {
      title: `Quiz - ${module.title}`,
      description: `Valider les points clés du module ${moduleIndex + 1}.`,
      questions: [
        {
          questionText: `Quelle pratique est recommandée dans le module "${module.title}" ?`,
          explanation: `La bonne pratique consiste à ${module.keyPractice}.`,
          options: [
            { optionText: `Il faut ${module.keyPractice}`, isCorrect: true },
            { optionText: `Il faut ${module.wrongPractice}`, isCorrect: false },
            { optionText: 'Il faut ignorer le suivi du module', isCorrect: false },
          ],
        },
        {
          questionText: 'Ce module doit être appliqué avec régularité.',
          explanation: 'La régularité rend la formation utile dans la vraie vie.',
          options: [
            { optionText: 'Vrai', isCorrect: true },
            { optionText: 'Faux', isCorrect: false },
          ],
        },
      ],
    },
  };
}

function buildEmployeeVideoLesson(
  title: string,
  description: string,
  videoIndex: number,
  durationSeconds: number,
  badgeUrl?: string
): LessonSeed {
  const video = DEMO_VIMEO_VIDEOS[videoIndex % DEMO_VIMEO_VIDEOS.length];

  return {
    title,
    description,
    durationSeconds,
    vimeoVideoId: video.vimeoVideoId,
    videoUrl: video.videoUrl,
    resourcesUrl: badgeUrl,
    attachments: badgeUrl
      ? [{ title: `Badge - ${title}`, fileUrl: badgeUrl, fileType: 'pdf' }]
      : undefined,
  };
}

const phase2BadgeUrls = [
  '/pdf/PHASE-2/PHASE%202%20BADGE%20MODULE%201%20RESET%20CLUB.pdf',
  '/pdf/PHASE-2/BADGE%20MODULE%202%20RESET%20CLUB.pdf',
  '/pdf/PHASE-2/BADGE%20MODULE%203%20RESET%20CLUB.pdf',
  '/pdf/PHASE-2/BADGE%20MODULE%204%20RESET%20CLUB.pdf',
  '/pdf/PHASE-2/BADGE%20MODULE%205%20RESET%20CLUB.pdf',
];

const phaseBadgeUrls = {
  phase3: '/pdf/PHASE-3/BADGE%20MODULE%203%20RESET%20CLUB.pdf',
  phase4: '/pdf/PHASE-4/BADGE%20MODULE%204%20RESET%20CLUB.pdf',
  phase5: '/pdf/PHASE-5/BADGE%20MODULE%205%20RESET%20CLUB.pdf',
};

const employeeModules: ModuleSeed[] = [
  {
    title: 'PHASE 1 · Préonboarding Thérapeute RESET CLUB',
    description: 'Vidéo d’accueil thérapeute présentée par Nahed Rachad.',
    durationMinutes: 12,
    lessons: [
      buildEmployeeVideoLesson(
        'Vidéo accueil thérapeute - Nahed Rachad',
        'Comprendre la posture attendue avant de commencer le parcours thérapeute RESET CLUB.',
        0,
        420
      ),
    ],
  },
  {
    title: 'PHASE 2 · Module 1 - Bienvenue chez RESET CLUB',
    description: 'Vision, mission, ADN et valeurs RESET CLUB.',
    durationMinutes: 35,
    lessons: [
      buildEmployeeVideoLesson(
        'Bienvenue chez RESET CLUB',
        'Découvrir la mission, les valeurs et l’ADN RESET CLUB.',
        1,
        540,
        phase2BadgeUrls[0]
      ),
    ],
    quiz: {
      title: 'Quiz - Module 1 : Vision, Mission, ADN, Valeurs RESET CLUB',
      description: 'Valide le badge digital : Ambassadrice RESET CLUB.',
      questions: [
        {
          questionText: 'Pourquoi dit-on que tu n’es pas ici par hasard ?',
          explanation: 'La thérapeute est choisie pour accompagner les clientes dans leur transformation.',
          options: [
            { optionText: 'Parce que tu étais disponible à cette date', isCorrect: false },
            { optionText: 'Parce que tu as été choisie pour accompagner les clientes', isCorrect: true },
            { optionText: 'Parce que tu habites à proximité du centre', isCorrect: false },
            { optionText: 'Parce que tu veux juste tester une nouvelle méthode', isCorrect: false },
          ],
        },
        {
          questionText: 'Chez RESET CLUB, quel est le vrai but de notre mission ?',
          explanation: 'RESET CLUB aide les femmes à se reconnecter à leur pouvoir et leur confiance.',
          options: [
            { optionText: 'Faire des soins esthétiques basiques', isCorrect: false },
            { optionText: 'Vendre un maximum de jus détox', isCorrect: false },
            { optionText: 'Aider les femmes à se reconnecter à leur pouvoir et leur confiance', isCorrect: true },
            { optionText: 'Proposer une alternative au spa classique', isCorrect: false },
          ],
        },
        {
          questionText: 'Complète cette phrase : RESET CLUB, ce n’est pas un centre de plus, c’est...',
          explanation: 'RESET CLUB est pensé comme un espace de transformation.',
          options: [
            { optionText: 'Un endroit pour faire des soins chers', isCorrect: false },
            { optionText: 'Un endroit pour passer du temps', isCorrect: false },
            { optionText: 'Un espace pour renaître, se remettre en route, retrouver son énergie', isCorrect: true },
            { optionText: 'Un espace pour tester des machines innovantes', isCorrect: false },
          ],
        },
        {
          questionText: 'Quels sont les 3 piliers de l’ADN RESET CLUB ?',
          explanation: 'Les trois piliers sont IN, OUT et RESET.',
          options: [
            { optionText: 'Beauté - Nutrition - Sport', isCorrect: false },
            { optionText: 'IN - OUT - RESET', isCorrect: true },
            { optionText: 'Coaching - Massages - Relaxation', isCorrect: false },
            { optionText: 'Corps - Esprit - Soins', isCorrect: false },
          ],
        },
        {
          questionText: 'Le mot IN dans notre ADN signifie...',
          explanation: 'IN désigne ce qui entre dans le corps.',
          options: [
            { optionText: 'L’ambiance à l’intérieur du centre', isCorrect: false },
            { optionText: 'Ce qu’on absorbe et ce qu’on fait entrer dans le corps', isCorrect: true },
            { optionText: 'Les soins internes d’esthétique', isCorrect: false },
            { optionText: 'Le mindset de nos clientes', isCorrect: false },
          ],
        },
        {
          questionText: 'Quelles sont les valeurs essentielles du RESET CLUB ?',
          explanation: 'Les valeurs clés sont présence, respect, exigence, transformation et gratitude.',
          options: [
            { optionText: 'Rapidité, compétitivité, performance, pression', isCorrect: false },
            { optionText: 'Présence, respect, exigence, transformation, gratitude', isCorrect: true },
            { optionText: 'Silence, distance, neutralité, vitesse', isCorrect: false },
            { optionText: 'Prix, volume, rendement, standardisation', isCorrect: false },
          ],
        },
        {
          questionText: 'Comment devrais-tu te sentir en tant que membre de l’équipe RESET CLUB ?',
          explanation: 'L’équipe porte une mission de transformation.',
          options: [
            { optionText: 'Débordée mais satisfaite', isCorrect: false },
            { optionText: 'Chanceuse, engagée et fière de faire partie d’une équipe qui transforme des vies', isCorrect: true },
            { optionText: 'Responsable uniquement de ta machine', isCorrect: false },
            { optionText: 'Détachée émotionnellement', isCorrect: false },
          ],
        },
        {
          questionText: 'Complète cette phrase : RESET CLUB, ce n’est pas un petit job. C’est...',
          explanation: 'Le rôle est présenté comme une mission.',
          options: [
            { optionText: 'Un centre de bien-être parmi tant d’autres', isCorrect: false },
            { optionText: 'Une mission', isCorrect: true },
            { optionText: 'Une belle opportunité de carrière', isCorrect: false },
            { optionText: 'Un bon job d’appoint', isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    title: 'PHASE 2 · Module 2 - La Méthode IN•OUT•RESET',
    description: 'Comprendre la méthode créée par Nahed Rachad et les 3 leviers de transformation.',
    durationMinutes: 40,
    lessons: [
      buildEmployeeVideoLesson(
        'La Méthode IN•OUT•RESET',
        'Comprendre les leviers IN, OUT et RESET dans l’accompagnement client.',
        2,
        600,
        phase2BadgeUrls[1]
      ),
    ],
    quiz: {
      title: 'Quiz - Module 2 : La Méthode IN•OUT•RESET',
      description: 'Valide le badge digital : Praticienne RESET CLUB.',
      questions: [
        {
          questionText: 'D’où vient la méthode IN•OUT•RESET ?',
          explanation: 'Elle a été créée par Nahed Rachad après un parcours de recherche et d’expérience.',
          options: [
            { optionText: 'C’est une méthode achetée à l’étranger', isCorrect: false },
            { optionText: 'Elle a été créée par hasard à partir d’essais en centre esthétique', isCorrect: false },
            { optionText: 'Elle a été créée par Nahed Rachad après des années de recherches, d’expériences personnelles et de formations', isCorrect: true },
            { optionText: 'C’est une méthode inspirée d’un livre de développement personnel', isCorrect: false },
          ],
        },
        {
          questionText: 'Que signifie le IN dans la méthode RESET ?',
          explanation: 'IN concerne ce qui entre dans le corps.',
          options: [
            { optionText: 'Les soins internes proposés dans le centre', isCorrect: false },
            { optionText: 'Ce qui entre dans le corps : jus, infusions, compléments, alimentation, respiration', isCorrect: true },
            { optionText: 'L’énergie intérieure de la cliente', isCorrect: false },
            { optionText: 'L’organisation interne du centre', isCorrect: false },
          ],
        },
        {
          questionText: 'Que veut dire le OUT dans la méthode RESET ?',
          explanation: 'OUT concerne ce qui sort ou se libère du corps.',
          options: [
            { optionText: 'Ce qui sort du corps : toxines, stress, rétention d’eau, tensions', isCorrect: true },
            { optionText: 'La cliente qui sort du centre', isCorrect: false },
            { optionText: 'Ce qui n’est pas aligné avec nos valeurs', isCorrect: false },
            { optionText: 'La sortie de l’énergie masculine', isCorrect: false },
          ],
        },
        {
          questionText: 'Le RESET correspond à...',
          explanation: 'RESET vise une réinitialisation globale.',
          options: [
            { optionText: 'Une séance de repos et de sieste', isCorrect: false },
            { optionText: 'Un massage profond et intense', isCorrect: false },
            { optionText: 'La réinitialisation globale : émotions, système nerveux, mental, rapport au corps', isCorrect: true },
            { optionText: 'La suppression des kilos superflus', isCorrect: false },
          ],
        },
        {
          questionText: 'Quel est le vrai rôle d’une thérapeute RESET CLUB ?',
          explanation: 'La thérapeute active les trois leviers de transformation.',
          options: [
            { optionText: 'Appliquer les machines correctement', isCorrect: false },
            { optionText: 'Accueillir les clientes et servir les jus', isCorrect: false },
            { optionText: 'Activer les 3 leviers de transformation : IN, OUT, RESET', isCorrect: true },
            { optionText: 'Prendre les mesures de la cliente et archiver son dossier', isCorrect: false },
          ],
        },
        {
          questionText: 'Complète la phrase : Tu n’es pas là pour faire un soin. Tu es là pour...',
          explanation: 'La promesse porte sur une transformation.',
          options: [
            { optionText: 'Montrer que tu maîtrises les machines', isCorrect: false },
            { optionText: 'Remplir ta mission de la journée', isCorrect: false },
            { optionText: 'Appliquer un protocole à la lettre', isCorrect: false },
            { optionText: 'Offrir une transformation', isCorrect: true },
          ],
        },
        {
          questionText: 'Quels exemples relèvent du RESET ?',
          explanation: 'RESET inclut l’ambiance, la respiration consciente et le recentrage.',
          options: [
            { optionText: 'Appliquer uniquement la machine et remplir une fiche', isCorrect: false },
            { optionText: 'Installer une ambiance apaisante, proposer une respiration consciente, utiliser le bol Jacquier pour recentrer', isCorrect: true },
            { optionText: 'Faire seulement une fiche de suivi client', isCorrect: false },
            { optionText: 'Accélérer le soin pour respecter le planning', isCorrect: false },
          ],
        },
        {
          questionText: 'Pourquoi la méthode IN•OUT•RESET est-elle unique ?',
          explanation: 'Elle combine plusieurs dimensions de transformation.',
          options: [
            { optionText: 'Parce qu’elle utilise uniquement des technologies suisses', isCorrect: false },
            { optionText: 'Parce qu’elle est composée uniquement de produits naturels', isCorrect: false },
            { optionText: 'Parce qu’elle combine le meilleur du biohacking, du coaching, de la nutrition et des soins de l’âme et du corps', isCorrect: true },
            { optionText: 'Parce qu’elle dure plus longtemps que les autres', isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    title: 'PHASE 2 · Module 3 - Les 3 types de protocoles RESET CLUB',
    description: 'Protocoles, résultats et machines RESET CLUB.',
    durationMinutes: 35,
    lessons: [
      buildEmployeeVideoLesson(
        'Les 3 types de protocoles RESET CLUB',
        'Comprendre Light & Sculpt, Burn & Sculpt et Total Reset.',
        3,
        540,
        phase2BadgeUrls[2]
      ),
    ],
    quiz: {
      title: 'Quiz - Module 3 : Protocoles, Résultats & Machines',
      description: 'Valide la compréhension des protocoles RESET CLUB.',
      questions: [
        {
          questionText: 'Quel est l’objectif principal du protocole Light & Sculpt ?',
          explanation: 'Light & Sculpt vise à affiner, drainer et relancer le métabolisme.',
          options: [
            { optionText: 'Reprendre le contrôle sur ses émotions', isCorrect: false },
            { optionText: 'Affiner, drainer, relancer le métabolisme et retrouver un coup d’éclat', isCorrect: true },
            { optionText: 'Rééquilibrer les hormones et le sommeil', isCorrect: false },
            { optionText: 'Faire du sport intensif et perdre plus de 10 kg', isCorrect: false },
          ],
        },
        {
          questionText: 'Le protocole Burn & Sculpt est destiné à quel type de cliente ?',
          explanation: 'Burn & Sculpt s’adresse aux clientes qui ont besoin d’une stratégie claire et motivante.',
          options: [
            { optionText: 'Celle qui débute une remise en forme', isCorrect: false },
            { optionText: 'Celle qui veut sculpter ses bras uniquement', isCorrect: false },
            { optionText: 'Celle qui a déjà essayé plein de méthodes sans succès et cherche une stratégie claire, puissante et motivante', isCorrect: true },
            { optionText: 'Celle qui souhaite uniquement changer son alimentation', isCorrect: false },
          ],
        },
        {
          questionText: 'Complète la phrase : Tu ne guides pas juste un protocole ici, tu...',
          explanation: 'La thérapeute mène une mission.',
          options: [
            { optionText: 'Fais un massage', isCorrect: false },
            { optionText: 'Donnes un conseil alimentaire', isCorrect: false },
            { optionText: 'Mènes une mission', isCorrect: true },
            { optionText: 'Proposes un produit', isCorrect: false },
          ],
        },
        {
          questionText: 'Le protocole Total Reset est destiné à...',
          explanation: 'Total Reset accompagne une transformation complète.',
          options: [
            { optionText: 'Les femmes qui veulent juste se détendre', isCorrect: false },
            { optionText: 'Les femmes prêtes à une transformation physique, mentale et émotionnelle complète', isCorrect: true },
            { optionText: 'Les clientes qui veulent perdre 3 kilos pour une fête', isCorrect: false },
            { optionText: 'Celles qui veulent faire une pause bien-être', isCorrect: false },
          ],
        },
        {
          questionText: 'Quel est ton rôle principal en tant que thérapeute RESET CLUB ?',
          explanation: 'La thérapeute comprend, oriente, incarne et accompagne.',
          options: [
            { optionText: 'Gérer la machine et surveiller la minuterie', isCorrect: false },
            { optionText: 'Suivre le client sans trop interagir', isCorrect: false },
            { optionText: 'Comprendre la cliente, l’orienter, incarner le protocole, et l’accompagner avec puissance', isCorrect: true },
            { optionText: 'Lui vendre des jus en fin de séance', isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    title: 'PHASE 2 · Module 4 - Accueil Client & Rituel RESET',
    description: 'Installer un accueil client aligné avec l’expérience RESET.',
    durationMinutes: 35,
    lessons: [
      buildEmployeeVideoLesson(
        'Accueil Client & Rituel RESET',
        'Incarner le rituel d’accueil et l’ambiance RESET CLUB.',
        4,
        540,
        phase2BadgeUrls[3]
      ),
    ],
    quiz: {
      title: 'Quiz - Module 4 : Accueil Client & Rituel RESET',
      description: 'Valide le badge digital : Gardienne de l’Accueil RESET.',
      questions: [
        {
          questionText: 'Pourquoi dit-on que l’accueil RESET n’est pas un simple bonjour ?',
          explanation: 'L’accueil est un rituel d’entrée dans la transformation.',
          options: [
            { optionText: 'Parce qu’il faut impressionner la clientèle', isCorrect: false },
            { optionText: 'Parce que l’accueil est un vrai rituel d’entrée dans la transformation', isCorrect: true },
            { optionText: 'Parce que la première impression est toujours importante', isCorrect: false },
            { optionText: 'Parce que le centre suit une procédure stricte de bienvenue', isCorrect: false },
          ],
        },
        {
          questionText: 'Les 3 attitudes clés à incarner dès l’accueil sont...',
          explanation: 'L’accueil RESET repose sur présence, chaleur et respect.',
          options: [
            { optionText: 'Autorité - Silence - Détachement', isCorrect: false },
            { optionText: 'Présence - Chaleur - Respect', isCorrect: true },
            { optionText: 'Rapidité - Professionnalisme - Conformité', isCorrect: false },
            { optionText: 'Efficacité - Rigueur - Concentration', isCorrect: false },
          ],
        },
        {
          questionText: 'Pourquoi la boisson signature RESET est-elle importante ?',
          explanation: 'Elle initie la transformation comme un soin liquide.',
          options: [
            { optionText: 'Elle hydrate simplement la cliente', isCorrect: false },
            { optionText: 'Elle permet de faire patienter avant le soin', isCorrect: false },
            { optionText: 'Elle représente un soin liquide qui initie la transformation', isCorrect: true },
            { optionText: 'Elle donne une image plus haut de gamme au centre', isCorrect: false },
          ],
        },
        {
          questionText: 'Quelle boisson est proposée à l’arrivée selon l’heure de la journée ?',
          explanation: 'Le jus de Sassy ou une infusion OUT fait partie du rituel.',
          options: [
            { optionText: 'Un jus de fruit standard', isCorrect: false },
            { optionText: 'Un café detox ou thé noir', isCorrect: false },
            { optionText: 'Le jus de Sassy ou une infusion OUT', isCorrect: true },
            { optionText: 'Une eau minérale avec rondelle de citron', isCorrect: false },
          ],
        },
        {
          questionText: 'Quels éléments composent l’ambiance RESET ?',
          explanation: 'L’ambiance RESET repose sur la signature olfactive, la playlist et la lumière tamisée.',
          options: [
            { optionText: 'Couleurs flashy, lumière vive et écran TV publicitaire', isCorrect: false },
            { optionText: 'Signature olfactive validée, playlist douce et vibrante, lumière tamisée et apaisante', isCorrect: true },
            { optionText: 'Silence complet, lumière forte et parfum neutre', isCorrect: false },
            { optionText: 'Musique dynamique, annonces micro et vidéos publicitaires', isCorrect: false },
          ],
        },
        {
          questionText: 'Quelle phrase résume bien la posture RESET ?',
          explanation: 'La posture est une présence féminine au service d’une autre femme.',
          options: [
            { optionText: 'Tu es là pour vendre un soin', isCorrect: false },
            { optionText: 'Tu es là pour suivre un protocole strict', isCorrect: false },
            { optionText: 'Tu es là en femme au service d’une autre femme', isCorrect: true },
            { optionText: 'Tu es là pour t’assurer que le planning est respecté', isCorrect: false },
          ],
        },
        {
          questionText: 'Que dis-tu à la cliente lorsqu’elle commence son parcours ?',
          explanation: 'Le message doit installer appartenance, présence et accompagnement.',
          options: [
            { optionText: 'Voici votre fiche, on va commencer rapidement.', isCorrect: false },
            { optionText: 'Bienvenue au RESET CLUB, nous allons entamer la première étape.', isCorrect: false },
            { optionText: 'Bienvenue chez toi. Ce parcours, c’est le tien. Et je serai là avec toi.', isCorrect: true },
            { optionText: 'Merci d’avoir choisi notre centre.', isCorrect: false },
          ],
        },
        {
          questionText: 'Quel est l’objectif ultime de cet accueil unique ?',
          explanation: 'La cliente doit sentir qu’elle a trouvé sa place.',
          options: [
            { optionText: 'Fidéliser la cliente', isCorrect: false },
            { optionText: 'Créer une ambiance mémorable', isCorrect: false },
            { optionText: 'Lui donner envie de revenir', isCorrect: false },
            { optionText: 'Faire dire à la cliente : Ici, j’ai trouvé ma place.', isCorrect: true },
          ],
        },
      ],
    },
  },
  {
    title: 'PHASE 2 · Module 5 - Éthique, Confidentialité & Posture de Thérapeute',
    description: 'Incarner l’éthique RESET CLUB, la confidentialité et la posture juste.',
    durationMinutes: 35,
    lessons: [
      buildEmployeeVideoLesson(
        'Éthique, Confidentialité & Posture de Thérapeute',
        'Comprendre la confidentialité, la posture et la responsabilité thérapeute.',
        5,
        540,
        phase2BadgeUrls[4]
      ),
    ],
    quiz: {
      title: 'Quiz - Module 5 : Éthique, Confidentialité & Posture RESET CLUB',
      description: 'Valide le badge digital : Gardienne de Confiance RESET.',
      questions: [
        {
          questionText: 'Que signifie la confidentialité chez RESET CLUB ?',
          explanation: 'Tout ce que la cliente partage reste confidentiel.',
          options: [
            { optionText: 'Ne rien dire à l’extérieur, sauf au responsable', isCorrect: false },
            { optionText: 'Pouvoir parler des clientes uniquement entre collègues', isCorrect: false },
            { optionText: 'Garder pour soi tout ce que la cliente partage, sans exception', isCorrect: true },
            { optionText: 'Partager anonymement l’expérience client sur Instagram', isCorrect: false },
          ],
        },
        {
          questionText: 'Complète la phrase : Tu peux être fière de ton travail. Mais...',
          explanation: 'La discrétion fait partie de la posture RESET.',
          options: [
            { optionText: 'Tu dois tout enregistrer pour preuve', isCorrect: false },
            { optionText: 'Tu n’as jamais besoin de raconter les détails d’une séance pour le prouver', isCorrect: true },
            { optionText: 'Tu dois tout noter pour les RH', isCorrect: false },
            { optionText: 'Tu dois le partager avec ta communauté', isCorrect: false },
          ],
        },
        {
          questionText: 'Quels comportements incarnent l’éthique RESET CLUB ?',
          explanation: 'L’éthique RESET repose sur la préparation, la sécurité et la dignité.',
          options: [
            { optionText: 'Arriver à l’heure et préparée, faire passer la sécurité en priorité, traiter chaque cliente avec dignité', isCorrect: true },
            { optionText: 'Critiquer une cliente si elle ne suit pas le protocole', isCorrect: false },
            { optionText: 'Vendre un soin inutile pour faire du chiffre', isCorrect: false },
            { optionText: 'Partager les résultats clients sans demander', isCorrect: false },
          ],
        },
        {
          questionText: 'Quelle posture adopte une thérapeute RESET CLUB ?',
          explanation: 'La thérapeute incarne une présence douce, alignée et au service de la cliente.',
          options: [
            { optionText: 'Elle applique les soins en silence', isCorrect: false },
            { optionText: 'Elle lit les fiches et laisse la machine faire', isCorrect: false },
            { optionText: 'Elle est présente, douce, alignée, au service de la cliente', isCorrect: true },
            { optionText: 'Elle laisse la cliente s’auto-gérer pendant les soins', isCorrect: false },
          ],
        },
        {
          questionText: 'Quelles phrases reflètent l’esprit RESET CLUB ?',
          explanation: 'L’esprit RESET valorise l’encouragement, la progression et l’accompagnement.',
          options: [
            { optionText: 'Tu as fait le premier pas, ton corps change, je vois tes efforts et je suis là pour les accompagner.', isCorrect: true },
            { optionText: 'Tu n’as pas bien fait ton programme, c’est dommage.', isCorrect: false },
            { optionText: 'Essaie d’être plus sérieuse la prochaine fois.', isCorrect: false },
            { optionText: 'Tu dois tout réussir seule maintenant.', isCorrect: false },
          ],
        },
        {
          questionText: 'Complète cette phrase : Tu n’es pas une simple opératrice. Tu es...',
          explanation: 'La thérapeute est une présence, une alliée et un repère.',
          options: [
            { optionText: 'Une prestataire', isCorrect: false },
            { optionText: 'Une technicienne beauté', isCorrect: false },
            { optionText: 'Une présence, une alliée, un repère', isCorrect: true },
            { optionText: 'Une coach nutrition', isCorrect: false },
          ],
        },
        {
          questionText: 'Pourquoi dit-on que tu es le cœur battant du RESET CLUB ?',
          explanation: 'La posture et l’énergie de la thérapeute changent l’expérience client.',
          options: [
            { optionText: 'Parce que tu fais tourner le planning', isCorrect: false },
            { optionText: 'Parce que tu actives les machines', isCorrect: false },
            { optionText: 'Parce que ton énergie, ton regard, ta posture font toute la différence', isCorrect: true },
            { optionText: 'Parce que tu t’occupes du dossier client', isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    title: 'PHASE 3 · Formation présentielle coaching RESET CLUB',
    description: 'Contenu à venir.',
    durationMinutes: 0,
    lessons: [],
  },
  {
    title: 'PHASE 4 · Formation présentielle machine RESET CLUB',
    description: 'Contenu à venir.',
    durationMinutes: 0,
    lessons: [],
  },
  {
    title: 'PHASE 5 · Certification et intégration RESET CLUB',
    description: 'Contenu à venir.',
    durationMinutes: 0,
    lessons: [],
  },
  {
    title: 'PHASE 6 · Post-onboarding Thérapeute RESET CLUB',
    description: 'Contenu à venir.',
    durationMinutes: 0,
    lessons: [],
  },
];

const phaseTwoProtocolQuiz = employeeModules[3].quiz;
const phaseTwoAccueilQuiz = employeeModules[4].quiz;
const phaseTwoEthiqueQuiz = employeeModules[5].quiz;

employeeModules[6] = {
  title: 'PHASE 3 · Formation présentielle coaching RESET CLUB',
  description: 'Approfondir les protocoles, résultats et machines avec une posture de coaching terrain.',
  durationMinutes: 45,
  lessons: [
    buildEmployeeVideoLesson(
      'Formation présentielle coaching RESET CLUB',
      'Mettre en pratique les protocoles RESET CLUB avec une posture claire, incarnée et orientée résultat.',
      6,
      720,
      phaseBadgeUrls.phase3
    ),
  ],
  quiz: phaseTwoProtocolQuiz
    ? {
      ...phaseTwoProtocolQuiz,
      title: 'Quiz - Phase 3 : Formation présentielle coaching RESET CLUB',
      description: 'Valide la compréhension des protocoles, résultats et machines RESET CLUB.',
    }
    : undefined,
};

employeeModules[7] = {
  title: 'PHASE 4 · Formation présentielle machine RESET CLUB',
  description: 'Maîtriser l’accueil, le rituel RESET et l’utilisation terrain des machines.',
  durationMinutes: 45,
  lessons: [
    buildEmployeeVideoLesson(
      'Formation présentielle machine RESET CLUB',
      'Appliquer les gestes, les repères et l’expérience RESET autour des machines en centre.',
      0,
      720,
      phaseBadgeUrls.phase4
    ),
  ],
  quiz: phaseTwoAccueilQuiz
    ? {
      ...phaseTwoAccueilQuiz,
      title: 'Quiz - Phase 4 : Formation présentielle machine RESET CLUB',
      description: 'Valide le badge digital : Gardienne de l’Accueil RESET.',
    }
    : undefined,
};

employeeModules[8] = {
  title: 'PHASE 5 · Certification et intégration RESET CLUB',
  description: 'Valider la posture, l’éthique et la confidentialité avant intégration complète.',
  durationMinutes: 45,
  lessons: [
    buildEmployeeVideoLesson(
      'Certification et intégration RESET CLUB',
      'Finaliser la posture thérapeute RESET CLUB avec éthique, confidentialité et responsabilité.',
      1,
      720,
      phaseBadgeUrls.phase5
    ),
  ],
  quiz: phaseTwoEthiqueQuiz
    ? {
      ...phaseTwoEthiqueQuiz,
      title: 'Quiz - Phase 5 : Certification et intégration RESET CLUB',
      description: 'Valide le badge digital : Gardienne de Confiance RESET.',
    }
    : undefined,
};

const demoFormations: DemoFormation[] = [
  {
    title: 'Parcours Transformation RESET',
    slug: 'parcours-client-reset-360',
    description:
      'Un parcours guidé pour comprendre les piliers RESET CLUB, construire des routines durables et suivre sa transformation.',
    targetRole: 'CLIENT',
    difficultyLevel: 'BEGINNER',
    durationHours: 18,
    thumbnailUrl: '/images/OUT.jpg',
    modules: clientModuleBlueprints.map(buildModule),
  },
  {
    title: 'Onboarding Thérapeute RESET CLUB',
    slug: 'parcours-employe-reset-club',
    description:
      'Un parcours interne en 6 phases pour préparer, former, certifier et intégrer les thérapeutes RESET CLUB.',
    targetRole: 'EMPLOYEE',
    difficultyLevel: 'INTERMEDIATE',
    durationHours: 6,
    thumbnailUrl: '/images/OUT.jpg',
    modules: employeeModules,
  },
];

async function createFormation(data: DemoFormation) {
  return prisma.formation.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      difficultyLevel: data.difficultyLevel,
      targetRole: data.targetRole,
      isPublished: true,
      durationHours: data.durationHours,
      price: 0,
      currency: 'MAD',
      thumbnailUrl: data.thumbnailUrl,
      modules: {
        create: data.modules.map((module, moduleIndex) => ({
          title: module.title,
          description: module.description,
          orderIndex: moduleIndex + 1,
          durationMinutes: module.durationMinutes,
          ...(module.lessons.length > 0
            ? {
              lessons: {
                create: module.lessons.map((lesson, lessonIndex) => ({
                  title: lesson.title,
                  description: lesson.description,
                  durationSeconds: lesson.durationSeconds,
                  vimeoVideoId: lesson.vimeoVideoId,
                  videoUrl: lesson.videoUrl,
                  resourcesUrl: lesson.resourcesUrl,
                  orderIndex: lessonIndex + 1,
                  isPreview: moduleIndex === 0 && lessonIndex === 0,
                  ...(lesson.attachments?.length
                    ? {
                      attachments: {
                        create: lesson.attachments.map((attachment) => ({
                          title: attachment.title,
                          fileUrl: attachment.fileUrl,
                          fileType: attachment.fileType,
                        })),
                      },
                    }
                    : {}),
                })),
              },
            }
            : {}),
          ...(module.quiz
            ? {
              quizzes: {
                create: {
              title: module.quiz.title,
              description: module.quiz.description,
              passingScore: 70,
              maxAttempts: null,
              orderIndex: 1,
              questions: {
                create: module.quiz.questions.map((question, questionIndex) => ({
                  questionText: question.questionText,
                  questionType: question.options.length === 2 ? 'TRUE_FALSE' : 'MULTIPLE_CHOICE',
                  points: 1,
                  orderIndex: questionIndex + 1,
                  explanation: question.explanation,
                  options: {
                    create: question.options.map((option, optionIndex) => ({
                      optionText: option.optionText,
                      isCorrect: option.isCorrect,
                      orderIndex: optionIndex + 1,
                    })),
                  },
                })),
              },
            },
              },
            }
            : {}),
        })),
      },
    },
  });
}

async function main() {
  console.log('Seeding Reset Club Academy demo data...');

  await prisma.user.deleteMany({
    where: { email: { in: DEMO_USER_EMAILS } },
  });

  await prisma.formation.deleteMany({
    where: {
      OR: [
        { slug: { in: DEMO_FORMATION_SLUGS } },
        { targetRole: 'EMPLOYEE' },
      ],
    },
  });

  const [clientPasswordHash, employeePasswordHash] = await Promise.all([
    bcrypt.hash(DEMO_PASSWORDS.client, 12),
    bcrypt.hash(DEMO_PASSWORDS.employee, 12),
  ]);

  const clientUser = await prisma.user.create({
    data: {
      email: 'client.demo@resetclub.ma',
      passwordHash: clientPasswordHash,
      firstName: 'Client',
      lastName: 'Démo',
      role: 'CLIENT',
      isActive: true,
      emailVerified: true,
    },
  });

  const employeeUser = await prisma.user.create({
    data: {
      email: 'employee.demo@resetclub.ma',
      passwordHash: employeePasswordHash,
      firstName: 'Employé',
      lastName: 'Démo',
      role: 'EMPLOYEE',
      isActive: true,
      emailVerified: true,
    },
  });

  const createdFormations = await Promise.all(demoFormations.map(createFormation));
  const clientFormation = createdFormations.find((formation) => formation.targetRole === 'CLIENT');
  const employeeFormation = createdFormations.find((formation) => formation.targetRole === 'EMPLOYEE');

  if (!clientFormation || !employeeFormation) {
    throw new Error('Demo formations were not created correctly.');
  }

  await prisma.$transaction([
    prisma.enrollment.create({
      data: {
        userId: clientUser.id,
        formationId: clientFormation.id,
        status: 'ENROLLED',
      },
    }),
    prisma.formationAccess.create({
      data: {
        userId: clientUser.id,
        formationId: clientFormation.id,
        accessType: 'FREE',
      },
    }),
    prisma.enrollment.create({
      data: {
        userId: employeeUser.id,
        formationId: employeeFormation.id,
        status: 'ENROLLED',
      },
    }),
    prisma.formationAccess.create({
      data: {
        userId: employeeUser.id,
        formationId: employeeFormation.id,
        accessType: 'ADMIN_GRANTED',
      },
    }),
  ]);

  console.log('Created demo users:');
  console.log(`- CLIENT   ${clientUser.email} / ${DEMO_PASSWORDS.client}`);
  console.log(`- EMPLOYEE ${employeeUser.email} / ${DEMO_PASSWORDS.employee}`);
  console.log('Created client demo formation and employee therapist onboarding formation.');
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
