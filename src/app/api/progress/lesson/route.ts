import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAcademySession } from '@/lib/auth/academy-session';
import prisma from '@/lib/prisma';
import {
  getFormationCompletionTargets,
  getOrCreateEnrollment,
  syncFormationProgress,
} from '@/lib/academy/progress';

// POST /api/progress/lesson — Mark a lesson as completed
export async function POST(request: NextRequest) {
  try {
    const session = await getCurrentAcademySession(request);
    if (!session.ok) {
      return NextResponse.json({ error: session.error }, { status: session.status });
    }

    const { lessonId, formationId } = await request.json();

    if (!lessonId || !formationId) {
      return NextResponse.json({ error: 'lessonId et formationId requis' }, { status: 400 });
    }

    const targets = await getFormationCompletionTargets(formationId);

    if (!targets) {
      return NextResponse.json({ error: 'Formation non trouvée' }, { status: 404 });
    }

    if (!targets.lessonIds.includes(lessonId)) {
      return NextResponse.json({ error: 'Leçon introuvable dans cette formation' }, { status: 400 });
    }

    const userId = session.user.id;
    const enrollment = await getOrCreateEnrollment(userId, formationId);

    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId_enrollmentId: {
          userId,
          lessonId,
          enrollmentId: enrollment.id,
        },
      },
      update: {
        isCompleted: true,
        completedAt: new Date(),
      },
      create: {
        userId,
        lessonId,
        enrollmentId: enrollment.id,
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    const progress = await syncFormationProgress(userId, formationId);

    return NextResponse.json({
      success: true,
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
    console.error('Error saving lesson progress:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
