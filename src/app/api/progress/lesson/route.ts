import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

// POST /api/progress/lesson — Mark a lesson as completed
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as {
      userId: string;
    };

    const { lessonId, formationId } = await request.json();

    if (!lessonId || !formationId) {
      return NextResponse.json({ error: 'lessonId et formationId requis' }, { status: 400 });
    }

    // Find or create enrollment
    let enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_formationId: {
          userId: payload.userId,
          formationId,
        },
      },
    });

    if (!enrollment) {
      enrollment = await prisma.enrollment.create({
        data: {
          userId: payload.userId,
          formationId,
          status: 'IN_PROGRESS',
          progressPercentage: 0,
        },
      });
    }

    // Upsert lesson progress
    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId_enrollmentId: {
          userId: payload.userId,
          lessonId,
          enrollmentId: enrollment.id,
        },
      },
      update: {
        isCompleted: true,
        completedAt: new Date(),
      },
      create: {
        userId: payload.userId,
        lessonId,
        enrollmentId: enrollment.id,
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    // Recalculate overall progress
    const formation = await prisma.formation.findUnique({
      where: { id: formationId },
      include: {
        modules: {
          include: { lessons: { select: { id: true } } },
        },
      },
    });

    const totalLessons = formation?.modules.reduce((acc, m) => acc + m.lessons.length, 0) || 0;
    const completedCount = await prisma.lessonProgress.count({
      where: {
        userId: payload.userId,
        enrollmentId: enrollment.id,
        isCompleted: true,
      },
    });

    const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
    const isFormationComplete = progressPercentage >= 100;

    // Update enrollment progress
    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        progressPercentage,
        status: isFormationComplete ? 'COMPLETED' : 'IN_PROGRESS',
        completionDate: isFormationComplete ? new Date() : null,
        lastAccessedAt: new Date(),
      },
    });

    // If formation complete, create certificate if it doesn't exist
    if (isFormationComplete) {
      const existing = await prisma.certificate.findFirst({
        where: { userId: payload.userId, formationId },
      });

      if (!existing) {
        const certNumber = `RC-${Date.now()}-${payload.userId.slice(0, 6).toUpperCase()}`;
        const verificationCode = `${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

        await prisma.certificate.create({
          data: {
            enrollmentId: enrollment.id,
            userId: payload.userId,
            formationId,
            certificateNumber: certNumber,
            verificationCode,
            isValid: true,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      progressPercentage,
      isComplete: isFormationComplete,
      completedLessons: completedCount,
      totalLessons,
    });
  } catch (error) {
    console.error('Error saving lesson progress:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
