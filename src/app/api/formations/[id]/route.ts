import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/formations/[id] - Get formation with modules and lessons (public/student view)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const formation = await prisma.formation.findUnique({
      where: { id },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { orderIndex: 'asc' }
            }
          },
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    if (!formation) {
      return NextResponse.json(
        { error: 'Formation non trouvée' },
        { status: 404 }
      );
    }

    // Only include published formations or allow all for development
    // TODO: Add authentication and enrollment check in production
    if (!formation.isPublished) {
      console.log('Formation not published, but showing for development');
    }

    return NextResponse.json({ formation });
  } catch (error) {
    console.error('Error fetching formation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la formation' },
      { status: 500 }
    );
  }
}
