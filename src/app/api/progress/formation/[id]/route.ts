import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import prisma from '@/lib/prisma';

// GET /api/progress/formation/[id] — Get completion status for a formation
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id: formationId } = await params;

    // Get formation with all lessons
    const formation = await prisma.formation.findUnique({
      where: { id: formationId },
      include: {
        modules: {
          include: { lessons: { select: { id: true } } },
        },
      },
    });

    if (!formation) {
      return NextResponse.json({ error: 'Formation non trouvée' }, { status: 404 });
    }

    const totalLessons = formation.modules.reduce((acc, m) => acc + m.lessons.length, 0);

    // Get enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_formationId: {
          userId: payload.userId,
          formationId,
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json({
        isComplete: false,
        completedLessons: 0,
        totalLessons,
        progressPercentage: 0,
        completedLessonIds: [],
      });
    }

    // Get completed lesson IDs
    const completedProgress = await prisma.lessonProgress.findMany({
      where: {
        userId: payload.userId,
        enrollmentId: enrollment.id,
        isCompleted: true,
      },
      select: { lessonId: true },
    });

    const completedLessonIds = completedProgress.map((p) => p.lessonId);
    const completedLessons = completedLessonIds.length;
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    const isComplete = completedLessons >= totalLessons && totalLessons > 0;

    return NextResponse.json({
      isComplete,
      completedLessons,
      totalLessons,
      progressPercentage: Math.round(progressPercentage),
      completedLessonIds,
    });
  } catch (error) {
    console.error('Error fetching formation progress:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
