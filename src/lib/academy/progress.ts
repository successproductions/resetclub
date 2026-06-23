import prisma from '@/lib/prisma';

export async function getOrCreateEnrollment(userId: string, formationId: string) {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_formationId: {
        userId,
        formationId,
      },
    },
  });

  if (enrollment) {
    return enrollment;
  }

  return prisma.enrollment.create({
    data: {
      userId,
      formationId,
      status: 'IN_PROGRESS',
      progressPercentage: 0,
      lastAccessedAt: new Date(),
    },
  });
}

export async function getFormationCompletionTargets(formationId: string) {
  const formation = await prisma.formation.findUnique({
    where: { id: formationId },
    include: {
      modules: {
        include: {
          lessons: {
            select: {
              id: true,
              quizzes: {
                select: { id: true },
              },
            },
          },
          quizzes: {
            select: { id: true },
          },
        },
      },
    },
  });

  if (!formation) {
    return null;
  }

  const lessonIds = formation.modules.flatMap((module) =>
    module.lessons.map((lesson) => lesson.id)
  );
  const quizIds = Array.from(
    new Set(
      formation.modules.flatMap((module) => [
        ...module.quizzes.map((quiz) => quiz.id),
        ...module.lessons.flatMap((lesson) => lesson.quizzes.map((quiz) => quiz.id)),
      ])
    )
  );

  return {
    formation,
    lessonIds,
    quizIds,
  };
}

export async function getFormationProgress(userId: string, formationId: string) {
  const targets = await getFormationCompletionTargets(formationId);

  if (!targets) {
    return null;
  }

  const { lessonIds, quizIds } = targets;
  const totalLessons = lessonIds.length;
  const totalQuizzes = quizIds.length;
  const totalItems = totalLessons + totalQuizzes;

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_formationId: {
        userId,
        formationId,
      },
    },
  });

  if (!enrollment) {
    return {
      enrollment: null,
      totalLessons,
      totalQuizzes,
      completedLessons: 0,
      completedQuizzes: 0,
      totalItems,
      completedItems: 0,
      progressPercentage: 0,
      isComplete: false,
      completedLessonIds: [] as string[],
      completedQuizIds: [] as string[],
    };
  }

  const completedLessons = await prisma.lessonProgress.findMany({
    where: {
      userId,
      enrollmentId: enrollment.id,
      lessonId: { in: lessonIds },
      isCompleted: true,
    },
    select: { lessonId: true },
  });

  const completedQuizzes = await prisma.quizAttempt.findMany({
    where: {
      userId,
      enrollmentId: enrollment.id,
      quizId: { in: quizIds },
      completedAt: { not: null },
      passed: true,
    },
    distinct: ['quizId'],
    select: { quizId: true },
  });

  const completedLessonIds = completedLessons.map((progress) => progress.lessonId);
  const completedQuizIds = completedQuizzes.map((attempt) => attempt.quizId);
  const completedItems = completedLessonIds.length + completedQuizIds.length;
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  const isComplete = totalItems > 0 && completedItems >= totalItems;

  return {
    enrollment,
    totalLessons,
    totalQuizzes,
    completedLessons: completedLessonIds.length,
    completedQuizzes: completedQuizIds.length,
    totalItems,
    completedItems,
    progressPercentage,
    isComplete,
    completedLessonIds,
    completedQuizIds,
  };
}

export async function ensureCertificate(userId: string, formationId: string, enrollmentId: string) {
  const existing = await prisma.certificate.findFirst({
    where: { userId, formationId },
  });

  if (existing) {
    return existing;
  }

  const certificateNumber = `RC-${Date.now()}-${userId.slice(0, 6).toUpperCase()}`;
  const verificationCode = Math.random().toString(36).substring(2, 10).toUpperCase();

  return prisma.certificate.create({
    data: {
      enrollmentId,
      userId,
      formationId,
      certificateNumber,
      verificationCode,
      isValid: true,
    },
  });
}

export async function syncFormationProgress(userId: string, formationId: string) {
  const enrollment = await getOrCreateEnrollment(userId, formationId);
  const progress = await getFormationProgress(userId, formationId);

  if (!progress) {
    return null;
  }

  const updatedEnrollment = await prisma.enrollment.update({
    where: { id: enrollment.id },
    data: {
      progressPercentage: progress.progressPercentage,
      status: progress.isComplete ? 'COMPLETED' : 'IN_PROGRESS',
      completionDate: progress.isComplete
        ? progress.enrollment?.completionDate ?? new Date()
        : null,
      lastAccessedAt: new Date(),
    },
  });

  if (progress.isComplete) {
    await ensureCertificate(userId, formationId, updatedEnrollment.id);
  }

  return {
    ...progress,
    enrollment: updatedEnrollment,
  };
}
