import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAcademySession } from '@/lib/auth/academy-session';
import { getFormationProgress } from '@/lib/academy/progress';

// GET /api/progress/formation/[id] — Get completion status for a formation
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentAcademySession(request);
    if (!session.ok) {
      return NextResponse.json({ error: session.error }, { status: session.status });
    }

    const { id: formationId } = await params;
    const progress = await getFormationProgress(session.user.id, formationId);

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
      completedValidations: progress.completedValidations,
      totalValidations: progress.totalValidations,
      progressPercentage: Math.round(progress.progressPercentage),
      completedLessonIds: progress.completedLessonIds,
      completedQuizIds: progress.completedQuizIds,
      completedValidationModuleIds: progress.completedValidationModuleIds,
    });
  } catch (error) {
    console.error('Error fetching formation progress:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
