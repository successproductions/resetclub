import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAcademySession } from '@/lib/auth/academy-session';
import prisma from '@/lib/prisma';
import {
  getFormationCompletionTargets,
  getOrCreateEnrollment,
  syncFormationProgress,
} from '@/lib/academy/progress';

// POST /api/progress/quiz — Save a completed quiz attempt
export async function POST(request: NextRequest) {
  try {
    const session = await getCurrentAcademySession(request);
    if (!session.ok) {
      return NextResponse.json({ error: session.error }, { status: session.status });
    }

    const { quizId, formationId, score, answers } = await request.json();

    if (!quizId || !formationId || typeof score !== 'number') {
      return NextResponse.json(
        { error: 'quizId, formationId et score requis' },
        { status: 400 }
      );
    }

    const targets = await getFormationCompletionTargets(formationId);

    if (!targets) {
      return NextResponse.json({ error: 'Formation non trouvée' }, { status: 404 });
    }

    if (!targets.quizIds.includes(quizId)) {
      return NextResponse.json({ error: 'Quiz introuvable dans cette formation' }, { status: 400 });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      select: { passingScore: true },
    });

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz non trouvé' }, { status: 404 });
    }

    const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));
    const passed = normalizedScore >= quiz.passingScore;
    const userId = session.user.id;
    const enrollment = await getOrCreateEnrollment(userId, formationId);

    await prisma.quizAttempt.create({
      data: {
        userId,
        quizId,
        enrollmentId: enrollment.id,
        score: normalizedScore,
        passed,
        completedAt: new Date(),
        answersJson: answers ?? undefined,
      },
    });

    const progress = await syncFormationProgress(userId, formationId);

    return NextResponse.json({
      success: true,
      passed,
      score: normalizedScore,
      passingScore: quiz.passingScore,
      progressPercentage: Math.round(progress?.progressPercentage || 0),
      isComplete: progress?.isComplete || false,
      completedLessons: progress?.completedLessons || 0,
      totalLessons: progress?.totalLessons || 0,
      completedQuizzes: progress?.completedQuizzes || 0,
      totalQuizzes: progress?.totalQuizzes || 0,
      completedLessonIds: progress?.completedLessonIds || [],
      completedQuizIds: progress?.completedQuizIds || [],
    });
  } catch (error) {
    console.error('Error saving quiz progress:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
