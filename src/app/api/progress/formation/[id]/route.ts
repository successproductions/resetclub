import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { getFormationProgress } from '@/lib/academy/progress';

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
    const progress = await getFormationProgress(payload.userId, formationId);

    if (!progress) {
      return NextResponse.json({ error: 'Formation non trouvée' }, { status: 404 });
    }

    return NextResponse.json({
      isComplete: progress.isComplete,
      completedLessons: progress.completedLessons,
      totalLessons: progress.totalLessons,
      completedQuizzes: progress.completedQuizzes,
      totalQuizzes: progress.totalQuizzes,
      completedItems: progress.completedItems,
      totalItems: progress.totalItems,
      progressPercentage: Math.round(progress.progressPercentage),
      completedLessonIds: progress.completedLessonIds,
      completedQuizIds: progress.completedQuizIds,
    });
  } catch (error) {
    console.error('Error fetching formation progress:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
