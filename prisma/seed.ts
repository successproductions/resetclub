import { PrismaClient, TargetRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const DEMO_PASSWORDS = {
  client: 'ResetClient123!',
  employee: 'ResetEmployee123!',
};

const DEMO_VIMEO_VIDEOS = [
  { vimeoVideoId: '146022717', videoUrl: 'https://vimeo.com/146022717' },
  { vimeoVideoId: '22439234', videoUrl: 'https://vimeo.com/22439234' },
  { vimeoVideoId: '253989945', videoUrl: 'https://vimeo.com/253989945' },
  { vimeoVideoId: '66140585', videoUrl: 'https://vimeo.com/66140585' },
  { vimeoVideoId: '1084537', videoUrl: 'https://vimeo.com/1084537' },
  { vimeoVideoId: '45830194', videoUrl: 'https://vimeo.com/45830194' },
  { vimeoVideoId: '357274789', videoUrl: 'https://vimeo.com/357274789' },
  { vimeoVideoId: '174428903', videoUrl: 'https://vimeo.com/174428903' },
  { vimeoVideoId: '112836958', videoUrl: 'https://vimeo.com/112836958' },
  { vimeoVideoId: '11712103', videoUrl: 'https://vimeo.com/11712103' },
  { vimeoVideoId: '191947042', videoUrl: 'https://vimeo.com/191947042' },
  { vimeoVideoId: '115014610', videoUrl: 'https://vimeo.com/115014610' },
  { vimeoVideoId: '1211060', videoUrl: 'https://vimeo.com/1211060' },
  { vimeoVideoId: '25584872', videoUrl: 'https://vimeo.com/25584872' },
  { vimeoVideoId: '12769338', videoUrl: 'https://vimeo.com/12769338' },
  { vimeoVideoId: '160418182', videoUrl: 'https://vimeo.com/160418182' },
  { vimeoVideoId: '209051403', videoUrl: 'https://vimeo.com/209051403' },
  { vimeoVideoId: '199169823', videoUrl: 'https://vimeo.com/199169823' },
  { vimeoVideoId: '24069938', videoUrl: 'https://vimeo.com/24069938' },
  { vimeoVideoId: '100902001', videoUrl: 'https://vimeo.com/100902001' },
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
    description: 'Clarifier votre point de depart et definir une transformation realiste.',
    durationMinutes: 45,
    lessonOne: 'Comprendre votre parcours RESET',
    lessonTwo: 'Definir un objectif mesurable',
    keyPractice: 'suivre un objectif simple chaque semaine',
    wrongPractice: 'changer d objectif tous les jours',
  },
  {
    title: 'Diagnostic personnel',
    description: 'Observer energie, sommeil, stress et habitudes avant de commencer.',
    durationMinutes: 50,
    lessonOne: 'Lire vos signaux de depart',
    lessonTwo: 'Identifier vos freins principaux',
    keyPractice: 'noter les signaux importants sans jugement',
    wrongPractice: 'ignorer les signaux du corps',
  },
  {
    title: 'Mouvement intelligent',
    description: 'Activer le corps sans epuiser le systeme nerveux.',
    durationMinutes: 60,
    lessonOne: 'Activer le metabolisme en douceur',
    lessonTwo: 'Planifier les seances dans la semaine',
    keyPractice: 'choisir une routine compatible avec votre vie',
    wrongPractice: 'forcer jusqu a l epuisement',
  },
  {
    title: 'Technologies RESET',
    description: 'Comprendre comment les technologies soutiennent la transformation.',
    durationMinutes: 55,
    lessonOne: 'Comprendre le role des technologies',
    lessonTwo: 'Relier sensations et progression',
    keyPractice: 'associer les seances aux objectifs personnels',
    wrongPractice: 'attendre un resultat sans regularite',
  },
  {
    title: 'Nutrition stable',
    description: 'Installer des reperes alimentaires simples pour soutenir energie et satiate.',
    durationMinutes: 70,
    lessonOne: 'Construire une assiette stable',
    lessonTwo: 'Eviter les extremes alimentaires',
    keyPractice: 'repeter des repas simples et equilibres',
    wrongPractice: 'supprimer des familles alimentaires sans strategie',
  },
  {
    title: 'Hydratation et recuperation',
    description: 'Soutenir le corps entre les seances avec des gestes simples.',
    durationMinutes: 40,
    lessonOne: 'Hydratation utile au quotidien',
    lessonTwo: 'Recuperer sans culpabiliser',
    keyPractice: 'prevoir eau et temps de recuperation',
    wrongPractice: 'ne jamais laisser le corps recuperer',
  },
  {
    title: 'Sommeil et energie',
    description: 'Ameliorer la qualite du sommeil pour soutenir les resultats.',
    durationMinutes: 55,
    lessonOne: 'Comprendre le lien sommeil energie',
    lessonTwo: 'Construire une routine du soir',
    keyPractice: 'stabiliser une routine de sommeil',
    wrongPractice: 'sacrifier le sommeil pour aller plus vite',
  },
  {
    title: 'Stress et systeme nerveux',
    description: 'Reguler le stress pour garder une transformation durable.',
    durationMinutes: 60,
    lessonOne: 'Reconnaitre la surcharge nerveuse',
    lessonTwo: 'Utiliser des pauses regulatrices',
    keyPractice: 'utiliser une pause courte avant de reagir',
    wrongPractice: 'accumuler la pression sans pause',
  },
  {
    title: 'Habitudes anti-abandon',
    description: 'Preparer les moments difficiles avant qu ils arrivent.',
    durationMinutes: 65,
    lessonOne: 'Anticiper les semaines chargees',
    lessonTwo: 'Reprendre apres un ecart',
    keyPractice: 'avoir un plan minimum pour les jours difficiles',
    wrongPractice: 'abandonner apres un ecart',
  },
  {
    title: 'Suivi des progres',
    description: 'Mesurer les bons indicateurs sans devenir obsede par les chiffres.',
    durationMinutes: 50,
    lessonOne: 'Choisir les bons indicateurs',
    lessonTwo: 'Lire les progres non visibles',
    keyPractice: 'suivre energie, habits et constance',
    wrongPractice: 'ne regarder qu un seul chiffre',
  },
  {
    title: 'Maintien des resultats',
    description: 'Passer du programme a un mode de vie durable.',
    durationMinutes: 60,
    lessonOne: 'Consolider les acquis',
    lessonTwo: 'Eviter l effet retour en arriere',
    keyPractice: 'garder deux habitudes prioritaires',
    wrongPractice: 'arreter toutes les routines apres les premiers resultats',
  },
  {
    title: 'Plan personnel 30 jours',
    description: 'Construire un plan clair pour continuer apres la formation.',
    durationMinutes: 75,
    lessonOne: 'Designer votre routine 30 jours',
    lessonTwo: 'Fixer vos prochains rendez-vous',
    keyPractice: 'ecrire un plan d action court et realiste',
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
    keyPractice: 'rester coherent avec la promesse client',
    wrongPractice: 'utiliser un discours different a chaque client',
  },
  {
    title: 'Accueil et premiere impression',
    description: 'Installer un cadre professionnel des les premieres secondes.',
    durationMinutes: 55,
    lessonOne: 'Accueillir avec clarte',
    lessonTwo: 'Creer un climat de confiance',
    keyPractice: 'saluer, orienter et rassurer clairement',
    wrongPractice: 'laisser le client sans repere',
  },
  {
    title: 'Diagnostic client',
    description: 'Poser les bonnes questions avant de proposer un protocole.',
    durationMinutes: 70,
    lessonOne: 'Questions utiles avant seance',
    lessonTwo: 'Reformuler le besoin client',
    keyPractice: 'reformuler le besoin avant de conseiller',
    wrongPractice: 'supposer le besoin sans questionner',
  },
  {
    title: 'Protocoles cabine',
    description: 'Appliquer les etapes avec precision, hygiene et confort.',
    durationMinutes: 90,
    lessonOne: 'Preparer la cabine',
    lessonTwo: 'Controler chaque etape du protocole',
    keyPractice: 'suivre une checklist avant chaque seance',
    wrongPractice: 'lancer une seance sans verification',
  },
  {
    title: 'Securite et contre-indications',
    description: 'Identifier les signaux qui imposent prudence ou validation.',
    durationMinutes: 80,
    lessonOne: 'Lire la fiche client',
    lessonTwo: 'Savoir quand demander validation',
    keyPractice: 'verifier les contre-indications avant de commencer',
    wrongPractice: 'ignorer les informations medicales declarees',
  },
  {
    title: 'Technologies et explications',
    description: 'Expliquer les technologies avec des mots simples et rassurants.',
    durationMinutes: 65,
    lessonOne: 'Presenter une technologie simplement',
    lessonTwo: 'Repondre aux questions frequentes',
    keyPractice: 'expliquer le benefice sans jargon inutile',
    wrongPractice: 'noyer le client sous des termes techniques',
  },
  {
    title: 'Experience pendant la seance',
    description: 'Maintenir confort, discretion et attention pendant le soin.',
    durationMinutes: 60,
    lessonOne: 'Observer le confort client',
    lessonTwo: 'Communiquer pendant la seance',
    keyPractice: 'verifier regulierement le confort client',
    wrongPractice: 'ne jamais verifier les sensations',
  },
  {
    title: 'Coaching post-seance',
    description: 'Transformer la fin de seance en prochaine action claire.',
    durationMinutes: 60,
    lessonOne: 'Faire un bilan utile',
    lessonTwo: 'Donner une action simple',
    keyPractice: 'terminer avec une prochaine action precise',
    wrongPractice: 'finir sans recapitulatif',
  },
  {
    title: 'Suivi et relance',
    description: 'Maintenir l engagement sans pression excessive.',
    durationMinutes: 55,
    lessonOne: 'Relancer avec tact',
    lessonTwo: 'Adapter le message au profil',
    keyPractice: 'relancer avec un message court et personnalise',
    wrongPractice: 'envoyer le meme message a tout le monde',
  },
  {
    title: 'Gestion des objections',
    description: 'Repondre aux hesitations avec calme et precision.',
    durationMinutes: 70,
    lessonOne: 'Identifier la vraie objection',
    lessonTwo: 'Repondre sans forcer',
    keyPractice: 'clarifier l objection avant de repondre',
    wrongPractice: 'contredire le client trop vite',
  },
  {
    title: 'Qualite et tracabilite',
    description: 'Documenter les seances pour ameliorer le suivi et la coordination.',
    durationMinutes: 65,
    lessonOne: 'Notes utiles apres seance',
    lessonTwo: 'Partager les informations importantes',
    keyPractice: 'noter les informations utiles apres chaque seance',
    wrongPractice: 'garder les informations uniquement en memoire',
  },
  {
    title: 'Excellence operationnelle',
    description: 'Garder une experience fluide meme pendant les journees chargees.',
    durationMinutes: 75,
    lessonOne: 'Organiser une journee fluide',
    lessonTwo: 'Prevenir les erreurs repetitives',
    keyPractice: 'preparer les points critiques avant l affluence',
    wrongPractice: 'attendre le probleme pour reagir',
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
        description: `Objectif: comprendre ${module.keyPractice}.`,
        durationSeconds: 420 + moduleIndex * 20,
        vimeoVideoId: firstVideo.vimeoVideoId,
        videoUrl: firstVideo.videoUrl,
      },
      {
        title: module.lessonTwo,
        description: `Mise en pratique: eviter de ${module.wrongPractice}.`,
        durationSeconds: 390 + moduleIndex * 15,
        vimeoVideoId: secondVideo.vimeoVideoId,
        videoUrl: secondVideo.videoUrl,
      },
    ],
    quiz: {
      title: `Quiz - ${module.title}`,
      description: `Valider les points cles du module ${moduleIndex + 1}.`,
      questions: [
        {
          questionText: `Quelle pratique est recommandee dans le module "${module.title}" ?`,
          explanation: `La bonne pratique consiste a ${module.keyPractice}.`,
          options: [
            { optionText: `Il faut ${module.keyPractice}`, isCorrect: true },
            { optionText: `Il faut ${module.wrongPractice}`, isCorrect: false },
            { optionText: 'Il faut ignorer le suivi du module', isCorrect: false },
          ],
        },
        {
          questionText: 'Ce module doit etre applique avec regularite.',
          explanation: 'La regularite rend la formation utile dans la vraie vie.',
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
    title: 'Parcours Client RESET 360',
    slug: 'parcours-client-reset-360',
    description:
      'Un parcours guide pour comprendre les piliers RESET CLUB, construire des routines durables et suivre sa transformation.',
    targetRole: 'CLIENT',
    difficultyLevel: 'BEGINNER',
    durationHours: 18,
    thumbnailUrl: '/images/OUT.jpg',
    modules: clientModuleBlueprints.map(buildModule),
  },
  {
    title: 'Parcours Employe RESET CLUB',
    slug: 'parcours-employe-reset-club',
    description:
      'Une formation interne pour maitriser l experience client, les protocoles cabine et le suivi RESET CLUB.',
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
      lastName: 'Demo',
      role: 'CLIENT',
      isActive: true,
      emailVerified: true,
    },
  });

  const employeeUser = await prisma.user.create({
    data: {
      email: 'employee.demo@resetclub.ma',
      passwordHash: employeePasswordHash,
      firstName: 'Employe',
      lastName: 'Demo',
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
