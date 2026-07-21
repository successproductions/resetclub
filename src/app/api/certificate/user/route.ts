import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAcademySession } from '@/lib/auth/academy-session';
import prisma from '@/lib/prisma';

// GET /api/certificate/user — List all certificates for the current user
export async function GET(request: NextRequest) {
  try {
    const session = await getCurrentAcademySession(request);
    if (!session.ok) {
      return NextResponse.json({ error: session.error }, { status: session.status });
    }

    const certificates = await prisma.certificate.findMany({
      where: {
        userId: session.user.id,
        isValid: true,
      },
      include: {
        formation: {
          select: { title: true, thumbnailUrl: true },
        },
      },
      orderBy: { issuedDate: 'desc' },
    });

    return NextResponse.json({ certificates });
  } catch (error) {
    console.error('Error fetching user certificates:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
