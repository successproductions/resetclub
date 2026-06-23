import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import prisma from '@/lib/prisma';
import {
  getFormationCompletionTargets,
  getOrCreateEnrollment,
  syncFormationProgress,
} from '@/lib/academy/progress';

// POST /api/progress/quiz — Save a completed quiz attempt
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
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
    const enrollment = await getOrCreateEnrollment(payload.userId, formationId);

    await prisma.quizAttempt.create({
      data: {
        userId: payload.userId,
        quizId,
        enrollmentId: enrollment.id,
        score: normalizedScore,
        passed,
        completedAt: new Date(),
        answersJson: answers ?? undefined,
      },
    });

    const progress = await syncFormationProgress(payload.userId, formationId);

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
