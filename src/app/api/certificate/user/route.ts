import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import prisma from '@/lib/prisma';

// GET /api/certificate/user — List all certificates for the current user
export async function GET(request: NextRequest) {
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

    const certificates = await prisma.certificate.findMany({
      where: {
        userId: payload.userId,
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
