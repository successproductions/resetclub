import { NextRequest } from 'next/server';
import { extractTokenFromHeader, JWTPayload, verifyToken } from '@/lib/auth/jwt';
import prisma from '@/lib/prisma';

type AcademyUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: 'CLIENT' | 'EMPLOYEE' | 'ADMIN';
};

export type AcademySessionResult =
  | {
      ok: true;
      payload: JWTPayload;
      user: AcademyUser;
    }
  | {
      ok: false;
      status: 401;
      error: string;
    };

export async function getCurrentAcademySession(request: NextRequest): Promise<AcademySessionResult> {
  const token = extractTokenFromHeader(request.headers.get('Authorization'));

  if (!token) {
    return { ok: false, status: 401, error: 'Non authentifié' };
  }

  const payload = verifyToken(token);

  if (!payload) {
    return { ok: false, status: 401, error: 'Token invalide' };
  }

  const user = await prisma.user.findFirst({
    where: {
      isActive: true,
      role: payload.role,
      OR: [{ id: payload.userId }, { email: payload.email }],
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
    },
  });

  if (!user) {
    return { ok: false, status: 401, error: 'Session expirée, veuillez vous reconnecter' };
  }

  return { ok: true, payload, user };
}
