import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAcademySession } from '@/lib/auth/academy-session';
import prisma from '@/lib/prisma';

// GET /api/phase-validations?formationId=... - Current user's Phase 7 validation states
export async function GET(request: NextRequest) {
  try {
    const session = await getCurrentAcademySession(request);
    if (!session.ok) {
      return NextResponse.json({ error: session.error }, { status: session.status });
    }

    const { searchParams } = new URL(request.url);
    const formationId = searchParams.get('formationId');

    if (!formationId) {
      return NextResponse.json({ error: 'formationId requis' }, { status: 400 });
    }

    const modules = await prisma.module.findMany({
      where: {
        formationId,
        title: { startsWith: 'PHASE 7' },
      },
      select: {
        id: true,
        title: true,
      },
      orderBy: { orderIndex: 'asc' },
    });

    const existingValidations = await prisma.phaseValidation.findMany({
      where: {
        userId: session.user.id,
        moduleId: { in: modules.map((module) => module.id) },
      },
      select: {
        moduleId: true,
        status: true,
        reviewedAt: true,
        updatedAt: true,
      },
    });
    const validationByModuleId = new Map(
      existingValidations.map((validation) => [validation.moduleId, validation])
    );

    return NextResponse.json({
      validations: modules.map((module) => {
        const validation = validationByModuleId.get(module.id);

        return {
          moduleId: module.id,
          moduleTitle: module.title,
          status: validation?.status || 'PENDING',
          reviewedAt: validation?.reviewedAt || null,
          updatedAt: validation?.updatedAt || null,
        };
      }),
    });
  } catch (error) {
    console.error('Error fetching phase validations:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
