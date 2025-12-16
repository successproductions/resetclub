import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/formations/[id] - Get formation details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // DEVELOPMENT: Authentication disabled
    // TODO: Re-enable in production
    
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
      return NextResponse.json({ error: 'Formation non trouvée' }, { status: 404 });
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

// PUT /api/admin/formations/[id] - Update formation
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // DEVELOPMENT: Authentication disabled
    // TODO: Re-enable in production
    
    const { id } = await params;

    const body = await request.json();
    const {
      title,
      slug,
      description,
      difficultyLevel,
      targetRole,
      isPublished,
      durationHours,
      price,
      currency,
      thumbnailUrl
    } = body;

    const formation = await prisma.formation.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        difficultyLevel,
        targetRole,
        isPublished,
        durationHours: durationHours ? parseFloat(durationHours) : null,
        price: price ? parseFloat(price) : null,
        currency,
        thumbnailUrl
      }
    });

    return NextResponse.json({ formation });
  } catch (error: unknown) {
    console.error('Error updating formation:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ce slug existe déjà' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la formation' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/formations/[id] - Delete formation
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // DEVELOPMENT: Authentication disabled
    // TODO: Re-enable in production
    
    const { id } = await params;

    await prisma.formation.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting formation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la formation' },
      { status: 500 }
    );
  }
}
