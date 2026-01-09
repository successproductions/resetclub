import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/quizzes/[quizId] - Get quiz details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const { quizId } = await params;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId }
    });

    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ quiz });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du quiz' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/quizzes/[quizId] - Update quiz
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const { quizId } = await params;
    const body = await request.json();
    const { title, description, passingScore, timeLimitMinutes, maxAttempts } = body;

    const quiz = await prisma.quiz.update({
      where: { id: quizId },
      data: {
        title,
        description,
        passingScore,
        timeLimitMinutes,
        maxAttempts
      }
    });

    return NextResponse.json({ quiz });
  } catch (error) {
    console.error('Error updating quiz:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du quiz' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/quizzes/[quizId] - Delete quiz
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const { quizId } = await params;

    await prisma.quiz.delete({
      where: { id: quizId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du quiz' },
      { status: 500 }
    );
  }
}
