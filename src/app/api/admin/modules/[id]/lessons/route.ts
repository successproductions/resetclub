import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/modules/[id]/lessons - List all lessons for a module
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const lessons = await prisma.lesson.findMany({
      where: { moduleId: id },
      orderBy: { orderIndex: 'asc' }
    });

    return NextResponse.json({ lessons });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des leçons' },
      { status: 500 }
    );
  }
}

// POST /api/admin/modules/[id]/lessons - Create new lesson
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, vimeoVideoId, durationSeconds, isPreview } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Titre requis' },
        { status: 400 }
      );
    }

    // Get the next order index
    const lastLesson = await prisma.lesson.findFirst({
      where: { moduleId: id },
      orderBy: { orderIndex: 'desc' }
    });

    const orderIndex = (lastLesson?.orderIndex ?? -1) + 1;

    const lesson = await prisma.lesson.create({
      data: {
        moduleId: id,
        title,
        description: description || null,
        vimeoVideoId: vimeoVideoId || null,
        durationSeconds: durationSeconds || null,
        isPreview: isPreview || false,
        orderIndex
      }
    });

    return NextResponse.json({ lesson }, { status: 201 });
  } catch (error) {
    console.error('Error creating lesson:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la leçon' },
      { status: 500 }
    );
  }
}
