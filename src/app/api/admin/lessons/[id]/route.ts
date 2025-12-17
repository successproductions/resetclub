import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/lessons/[id] - Get lesson details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const lesson = await prisma.lesson.findUnique({
      where: { id }
    });

    if (!lesson) {
      return NextResponse.json(
        { error: 'Leçon non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({ lesson });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la leçon' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/lessons/[id] - Update lesson
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, vimeoVideoId, durationSeconds, isPreview } = body;

    const lesson = await prisma.lesson.update({
      where: { id },
      data: {
        title,
        description: description || null,
        vimeoVideoId: vimeoVideoId || null,
        durationSeconds: durationSeconds || null,
        isPreview: isPreview || false
      }
    });

    return NextResponse.json({ lesson });
  } catch (error) {
    console.error('Error updating lesson:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la leçon' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/lessons/[id] - Delete lesson
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.lesson.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la leçon' },
      { status: 500 }
    );
  }
}
