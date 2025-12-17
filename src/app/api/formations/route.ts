import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/formations - Get all formations with modules and lessons
export async function GET() {
  try {
    const formations = await prisma.formation.findMany({
      where: { isPublished: true },
      include: {
        modules: {
          include: {
            lessons: {
              select: {
                id: true
              }
            }
          },
          orderBy: { orderIndex: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ formations });
  } catch (error) {
    console.error('Error fetching formations:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des formations' },
      { status: 500 }
    );
  }
}
