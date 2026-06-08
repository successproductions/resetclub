import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

// GET /api/certificate/user — List all certificates for the current user
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as {
      userId: string;
    };

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
