import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Reset Club Academy formations...');

  // Create Formation 1: Academy Client
  const academyClient = await prisma.formation.create({
    data: {
      title: 'Academy Client',
      slug: 'academy-client',
      description: 'Programme de transformation complet pour les clients Reset Club',
      difficultyLevel: 'BEGINNER',
      targetRole: 'CLIENT',
      isPublished: true,
      durationHours: 10,
      price: 0,
      currency: 'MAD',
      thumbnailUrl: '/images/OUT.jpg',
      modules: {
        create: [
          {
            title: 'Bienvenue dans le Reset Club',
            description: 'Introduction au programme de transformation',
            orderIndex: 1,
            durationMinutes: 30,
            lessons: {
              create: [
                {
                  title: 'Commencer votre transformation',
                  description: 'Vidéo d\'introduction au programme Reset Club',
                  vimeoVideoId: '1038468190',
                  videoUrl: 'https://vimeo.com/1038468190/e4197f5cc3',
                  durationSeconds: 480,
                  orderIndex: 1,
                  isPreview: true
                },
                {
                  title: 'Fixer vos objectifs de perte de poids',
                  description: 'Apprendre à définir des objectifs réalistes',
                  orderIndex: 2,
                  isPreview: false
                },
                {
                  title: 'Comprendre le programme Reset',
                  description: 'Découvrir les 4 piliers du programme',
                  orderIndex: 3,
                  isPreview: false
                }
              ]
            }
          },
          {
            title: 'Nutrition & Alimentation',
            description: 'Bases de la nutrition saine pour la perte de poids',
            orderIndex: 2,
            durationMinutes: 90,
            lessons: {
              create: [
                {
                  title: 'Les bases de la nutrition saine',
                  description: 'Comprendre les macronutriments et micronutriments',
                  orderIndex: 1,
                  isPreview: false
                },
                {
                  title: 'Créer votre plan de repas',
                  description: 'Guide pratique pour planifier vos repas',
                  orderIndex: 2,
                  isPreview: false
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('✅ Created formation: Academy Client');

  // Create Formation 2: Academy Terapot (Employee)
  const academyTerapot = await prisma.formation.create({
    data: {
      title: 'Academy Terapot',
      slug: 'academy-terapot',
      description: 'Formation professionnelle pour les thérapeutes et employés Reset Club',
      difficultyLevel: 'INTERMEDIATE',
      targetRole: 'EMPLOYEE',
      isPublished: true,
      durationHours: 15,
      price: 0,
      currency: 'MAD',
      thumbnailUrl: '/images/OUT.jpg',
      modules: {
        create: [
          {
            title: 'Formation Thérapeute - Introduction',
            description: 'Introduction aux méthodes Reset Club',
            orderIndex: 1,
            durationMinutes: 45,
            lessons: {
              create: [
                {
                  title: 'Bienvenue dans l\'équipe Reset Club',
                  description: 'Vidéo de bienvenue pour les nouveaux thérapeutes',
                  vimeoVideoId: '1038468190',
                  videoUrl: 'https://vimeo.com/1038468190/e4197f5cc3',
                  durationSeconds: 480,
                  orderIndex: 1,
                  isPreview: true
                },
                {
                  title: 'Protocoles et méthodes',
                  description: 'Apprendre les protocoles Reset Club',
                  orderIndex: 2,
                  isPreview: false
                }
              ]
            }
          },
          {
            title: 'Accompagnement Client',
            description: 'Techniques d\'accompagnement et de coaching',
            orderIndex: 2,
            durationMinutes: 120,
            lessons: {
              create: [
                {
                  title: 'Écoute active et empathie',
                  description: 'Développer vos compétences d\'écoute',
                  orderIndex: 1,
                  isPreview: false
                },
                {
                  title: 'Gestion des défis clients',
                  description: 'Surmonter les obstacles avec vos clients',
                  orderIndex: 2,
                  isPreview: false
                }
              ]
            }
          }
        ]
      }
    }
  });


}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
