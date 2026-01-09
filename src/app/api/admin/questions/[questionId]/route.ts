import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/questions/[questionId] - Get question details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ questionId: string }> }
) {
  try {
    const { questionId } = await params;

    const question = await prisma.quizQuestion.findUnique({
      where: { id: questionId },
      include: {
        options: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    if (!question) {
      return NextResponse.json(
        { error: 'Question non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({ question });
  } catch (error) {
    console.error('Error fetching question:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la question' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/questions/[questionId] - Update question
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ questionId: string }> }
) {
  try {
    const { questionId } = await params;
    const body = await request.json();
    const { questionText, questionType, points, explanation, options } = body;

    // Delete existing options
    await prisma.quizOption.deleteMany({
      where: { questionId }
    });

    // Update question with new options
    const question = await prisma.quizQuestion.update({
      where: { id: questionId },
      data: {
        questionText,
        questionType,
        points,
        explanation,
        options: {
          create: options.map((opt: { optionText: string; isCorrect: boolean }, index: number) => ({
            optionText: opt.optionText,
            isCorrect: opt.isCorrect,
            orderIndex: index
          }))
        }
      },
      include: {
        options: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    return NextResponse.json({ question });
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la question' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/questions/[questionId] - Delete question
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ questionId: string }> }
) {
  try {
    const { questionId } = await params;

    await prisma.quizQuestion.delete({
      where: { id: questionId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la question' },
      { status: 500 }
    );
  }
}
