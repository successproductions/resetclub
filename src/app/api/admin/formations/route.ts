import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/formations - List all formations
export async function GET() {
  try {
    // DEVELOPMENT: Authentication disabled
    // TODO: Re-enable in production

    // Fetch all formations with module count
    const formations = await prisma.formation.findMany({
      include: {
        _count: {
          select: { modules: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
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

// POST /api/admin/formations - Create new formation
export async function POST(request: NextRequest) {
  try {
    // DEVELOPMENT: Authentication disabled
    // TODO: Re-enable in production

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

    // Create formation
    const formation = await prisma.formation.create({
      data: {
        title,
        slug,
        description,
        difficultyLevel,
        targetRole,
        isPublished: isPublished || false,
        durationHours: durationHours ? parseFloat(durationHours) : null,
        price: price ? parseFloat(price) : null,
        currency: currency || 'MAD',
        thumbnailUrl
        // createdBy: payload.userId // Disabled for development
      }
    });

    return NextResponse.json({ formation }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating formation:', error);
    
    // Handle unique constraint violation
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ce slug existe déjà' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erreur lors de la création de la formation' },
      { status: 500 }
    );
  }
}
