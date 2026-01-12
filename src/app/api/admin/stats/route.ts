import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/stats - Get dashboard statistics
export async function GET() {
  try {
    // DEVELOPMENT: Authentication disabled
    // TODO: Re-enable in production

    // Get stats - only query tables that exist
    const [totalUsers, totalFormations] = await Promise.all([
      prisma.user.count(),
      prisma.formation.count()
    ]);

    // For now, set enrollments to 0 until we implement the enrollment system
    const activeEnrollments = 0;
    const completedCourses = 0;

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
