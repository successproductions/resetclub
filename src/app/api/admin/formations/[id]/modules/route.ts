import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/formations/[id]/modules - List all modules for a formation
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const modules = await prisma.module.findMany({
      where: { formationId: id },
      include: {
        _count: {
          select: { lessons: true }
        }
      },
      orderBy: { orderIndex: 'asc' }
    });

    return NextResponse.json({ modules });
  } catch (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des modules' },
      { status: 500 }
    );
  }
}

// POST /api/admin/formations/[id]/modules - Create new module
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, durationMinutes } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Titre requis' },
        { status: 400 }
      );
    }

    // Get the next order index
    const lastModule = await prisma.module.findFirst({
      where: { formationId: id },
      orderBy: { orderIndex: 'desc' }
    });

    const orderIndex = (lastModule?.orderIndex ?? -1) + 1;

    const moduleData = await prisma.module.create({
      data: {
        formationId: id,
        title,
        description: description || null,
        durationMinutes: durationMinutes || null,
        orderIndex
      },
      include: {
        _count: {
          select: { lessons: true }
        }
      }
    });

    return NextResponse.json({ module: moduleData }, { status: 201 });
  } catch (error) {
    console.error('Error creating module:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du module' },
      { status: 500 }
    );
  }
}
