import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/quizzes/[quizId]/questions - Get all questions for a quiz
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const { quizId } = await params;

    const questions = await prisma.quizQuestion.findMany({
      where: { quizId },
      include: {
        options: {
          orderBy: { orderIndex: 'asc' }
        }
      },
      orderBy: { orderIndex: 'asc' }
    });

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des questions' },
      { status: 500 }
    );
  }
}

// POST /api/admin/quizzes/[quizId]/questions - Create a new question
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const { quizId } = await params;
    const body = await request.json();
    const { questionText, questionType, points, explanation, options } = body;

    // Get last question order
    const lastQuestion = await prisma.quizQuestion.findFirst({
      where: { quizId },
      orderBy: { orderIndex: 'desc' }
    });

    const orderIndex = (lastQuestion?.orderIndex ?? -1) + 1;

    // Create question with options
    const question = await prisma.quizQuestion.create({
      data: {
        quizId,
        questionText,
        questionType,
        points,
        explanation,
        orderIndex,
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

    return NextResponse.json({ question }, { status: 201 });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la question' },
      { status: 500 }
    );
  }
}
