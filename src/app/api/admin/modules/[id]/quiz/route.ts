import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/modules/[id]/quiz - Get quiz and questions for a module
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: moduleId } = await params;

    const quiz = await prisma.quiz.findFirst({
      where: { moduleId },
      include: {
        questions: {
          include: {
            options: {
              orderBy: { orderIndex: 'asc' }
            }
          },
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    if (!quiz) {
      return NextResponse.json({ quiz: null, questions: [] });
    }

    return NextResponse.json({ quiz, questions: quiz.questions });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du quiz' },
      { status: 500 }
    );
  }
}

// POST /api/admin/modules/[id]/quiz - Create quiz for a module
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: moduleId } = await params;
    const body = await request.json();
    const { title, description, passingScore, timeLimitMinutes, maxAttempts } = body;

    // Check if quiz already exists
    const existingQuiz = await prisma.quiz.findFirst({
      where: { moduleId }
    });

    if (existingQuiz) {
      return NextResponse.json(
        { error: 'Un quiz existe déjà pour ce module' },
        { status: 400 }
      );
    }

    const quiz = await prisma.quiz.create({
      data: {
        moduleId,
        title,
        description,
        passingScore,
        timeLimitMinutes,
        maxAttempts,
        orderIndex: 0
      }
    });

    return NextResponse.json({ quiz }, { status: 201 });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du quiz' },
      { status: 500 }
    );
  }
}
