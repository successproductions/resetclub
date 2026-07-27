import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAcademySession } from '@/lib/auth/academy-session';
import prisma from '@/lib/prisma';

// GET /api/admin/stats - Get dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const session = await getCurrentAcademySession(request);
    if (!session.ok) {
      return NextResponse.json({ error: session.error }, { status: session.status });
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Accès admin requis' }, { status: 403 });
    }

    const [totalUsers, totalFormations, activeEnrollments, completedEnrollments, validCertificates] = await Promise.all([
      prisma.user.count(),
      prisma.formation.count(),
      prisma.enrollment.count({
        where: {
          status: { in: ['ENROLLED', 'IN_PROGRESS'] },
        },
      }),
      prisma.enrollment.count({
        where: {
          status: 'COMPLETED',
        },
      }),
      prisma.certificate.count({
        where: {
          isValid: true,
        },
      }),
    ]);

    const completedCourses = Math.max(completedEnrollments, validCertificates);

    return NextResponse.json({
      totalUsers,
      totalFormations,
      activeEnrollments,
      completedCourses
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    );
  }
}
