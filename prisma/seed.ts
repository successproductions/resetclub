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

type DemoFormation = {
  title: string;
  slug: string;
  description: string;
  targetRole: TargetRole;
  difficultyLevel: 'BEGINNER' | 'INTERMEDIATE';
  durationHours: number;
  thumbnailUrl: string;
  modules: ReturnType<typeof buildModule>[];
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

const employeeModuleBlueprints: ModuleBlueprint[] = [
  {
    title: 'Culture RESET CLUB',
    description: 'Comprendre la promesse, le positionnement et les standards de marque.',
    durationMinutes: 50,
    lessonOne: 'La promesse RESET CLUB',
    lessonTwo: 'Posture premium et bienveillance',
    keyPractice: 'rester cohérent avec la promesse client',
    wrongPractice: 'utiliser un discours différent à chaque client',
  },
  {
    title: 'Accueil et première impression',
    description: 'Installer un cadre professionnel dès les premières secondes.',
    durationMinutes: 55,
    lessonOne: 'Accueillir avec clarté',
    lessonTwo: 'Créer un climat de confiance',
    keyPractice: 'saluer, orienter et rassurer clairement',
    wrongPractice: 'laisser le client sans repère',
  },
  {
    title: 'Diagnostic client',
    description: 'Poser les bonnes questions avant de proposer un protocole.',
    durationMinutes: 70,
    lessonOne: 'Questions utiles avant séance',
    lessonTwo: 'Reformuler le besoin client',
    keyPractice: 'reformuler le besoin avant de conseiller',
    wrongPractice: 'supposer le besoin sans questionner',
  },
  {
    title: 'Protocoles cabine',
    description: 'Appliquer les étapes avec précision, hygiène et confort.',
    durationMinutes: 90,
    lessonOne: 'Préparer la cabine',
    lessonTwo: 'Contrôler chaque étape du protocole',
    keyPractice: 'suivre une checklist avant chaque séance',
    wrongPractice: 'lancer une séance sans vérification',
  },
  {
    title: 'Sécurité et contre-indications',
    description: 'Identifier les signaux qui imposent prudence ou validation.',
    durationMinutes: 80,
    lessonOne: 'Lire la fiche client',
    lessonTwo: 'Savoir quand demander validation',
    keyPractice: 'vérifier les contre-indications avant de commencer',
    wrongPractice: 'ignorer les informations médicales déclarées',
  },
  {
    title: 'Technologies et explications',
    description: 'Expliquer les technologies avec des mots simples et rassurants.',
    durationMinutes: 65,
    lessonOne: 'Présenter une technologie simplement',
    lessonTwo: 'Répondre aux questions fréquentes',
    keyPractice: 'expliquer le bénéfice sans jargon inutile',
    wrongPractice: 'noyer le client sous des termes techniques',
  },
  {
    title: 'Expérience pendant la séance',
    description: 'Maintenir confort, discrétion et attention pendant le soin.',
    durationMinutes: 60,
    lessonOne: 'Observer le confort client',
    lessonTwo: 'Communiquer pendant la séance',
    keyPractice: 'vérifier régulièrement le confort client',
    wrongPractice: 'ne jamais vérifier les sensations',
  },
  {
    title: 'Coaching post-séance',
    description: 'Transformer la fin de séance en prochaine action claire.',
    durationMinutes: 60,
    lessonOne: 'Faire un bilan utile',
    lessonTwo: 'Donner une action simple',
    keyPractice: 'terminer avec une prochaine action précise',
    wrongPractice: 'finir sans récapitulatif',
  },
  {
    title: 'Suivi et relance',
    description: "Maintenir l'engagement sans pression excessive.",
    durationMinutes: 55,
    lessonOne: 'Relancer avec tact',
    lessonTwo: 'Adapter le message au profil',
    keyPractice: 'relancer avec un message court et personnalisé',
    wrongPractice: 'envoyer le même message à tout le monde',
  },
  {
    title: 'Gestion des objections',
    description: 'Répondre aux hésitations avec calme et précision.',
    durationMinutes: 70,
    lessonOne: 'Identifier la vraie objection',
    lessonTwo: 'Répondre sans forcer',
    keyPractice: "clarifier l'objection avant de répondre",
    wrongPractice: 'contredire le client trop vite',
  },
  {
    title: 'Qualité et traçabilité',
    description: 'Documenter les séances pour améliorer le suivi et la coordination.',
    durationMinutes: 65,
    lessonOne: 'Notes utiles après séance',
    lessonTwo: 'Partager les informations importantes',
    keyPractice: 'noter les informations utiles après chaque séance',
    wrongPractice: 'garder les informations uniquement en mémoire',
  },
  {
    title: 'Excellence opérationnelle',
    description: 'Garder une expérience fluide même pendant les journées chargées.',
    durationMinutes: 75,
    lessonOne: 'Organiser une journée fluide',
    lessonTwo: 'Prévenir les erreurs répétitives',
    keyPractice: "préparer les points critiques avant l'affluence",
    wrongPractice: 'attendre le problème pour réagir',
  },
];

function buildModule(module: ModuleBlueprint, moduleIndex: number) {
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
    title: 'Parcours Employé RESET CLUB',
    slug: 'parcours-employe-reset-club',
    description:
      "Une formation interne pour maîtriser l'expérience client, les protocoles cabine et le suivi RESET CLUB.",
    targetRole: 'EMPLOYEE',
    difficultyLevel: 'INTERMEDIATE',
    durationHours: 22,
    thumbnailUrl: '/images/OUT.jpg',
    modules: employeeModuleBlueprints.map(buildModule),
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
          lessons: {
            create: module.lessons.map((lesson, lessonIndex) => ({
              title: lesson.title,
              description: lesson.description,
              durationSeconds: lesson.durationSeconds,
              vimeoVideoId: lesson.vimeoVideoId,
              videoUrl: lesson.videoUrl,
              orderIndex: lessonIndex + 1,
              isPreview: moduleIndex === 0 && lessonIndex === 0,
            })),
          },
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
    where: { slug: { in: DEMO_FORMATION_SLUGS } },
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
  console.log('Created demo formations with 12 modules and 1 quiz per module.');
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
