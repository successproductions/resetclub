import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAcademySession } from '@/lib/auth/academy-session';
import { syncFormationProgress } from '@/lib/academy/progress';
import prisma from '@/lib/prisma';

const ALLOWED_STATUSES = ['PENDING', 'VALIDATED', 'NOT_VALIDATED'] as const;
type PhaseValidationStatusValue = (typeof ALLOWED_STATUSES)[number];

async function requireAdmin(request: NextRequest) {
  const session = await getCurrentAcademySession(request);

  if (!session.ok) {
    return { ok: false as const, response: NextResponse.json({ error: session.error }, { status: session.status }) };
  }

  if (session.user.role !== 'ADMIN') {
    return { ok: false as const, response: NextResponse.json({ error: 'Accès admin requis' }, { status: 403 }) };
  }

  return { ok: true as const, user: session.user };
}

// GET /api/admin/phase-validations - List employee Phase 7 validation rows
export async function GET(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);
    if (!admin.ok) {
      return admin.response;
    }

    const modules = await prisma.module.findMany({
      where: {
        title: { startsWith: 'PHASE 7' },
        formation: { targetRole: 'EMPLOYEE' },
      },
      select: {
        id: true,
        title: true,
        formationId: true,
        formation: {
          select: {
            title: true,
          },
        },
      },
      orderBy: { orderIndex: 'asc' },
    });

    if (modules.length === 0) {
      return NextResponse.json({ validations: [] });
    }

    const formationIds = modules.map((module) => module.formationId);
    const users = await prisma.user.findMany({
      where: {
        role: 'EMPLOYEE',
        isActive: true,
        OR: [
          { enrollments: { some: { formationId: { in: formationIds } } } },
          { formationAccess: { some: { formationId: { in: formationIds }, isActive: true } } },
        ],
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
      orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }, { email: 'asc' }],
    });

    const existingValidations = await prisma.phaseValidation.findMany({
      where: {
        moduleId: { in: modules.map((module) => module.id) },
        userId: { in: users.map((user) => user.id) },
      },
      include: {
        reviewedBy: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    const validationByKey = new Map(
      existingValidations.map((validation) => [`${validation.userId}:${validation.moduleId}`, validation])
    );

    const validations = modules.flatMap((module) =>
      users.map((user) => {
        const validation = validationByKey.get(`${user.id}:${module.id}`);
        const reviewer = validation?.reviewedBy;
        const reviewerName = reviewer
          ? [reviewer.firstName, reviewer.lastName].filter(Boolean).join(' ') || reviewer.email
          : null;

        return {
          id: validation?.id || null,
          userId: user.id,
          employeeName: [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email,
          employeeEmail: user.email,
          moduleId: module.id,
          moduleTitle: module.title,
          formationTitle: module.formation.title,
          status: validation?.status || 'PENDING',
          reviewedAt: validation?.reviewedAt || null,
          updatedAt: validation?.updatedAt || null,
          reviewerName,
        };
      })
    );

    return NextResponse.json({ validations });
  } catch (error) {
    console.error('Error fetching admin phase validations:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PATCH /api/admin/phase-validations - Update one employee Phase 7 validation status
export async function PATCH(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);
    if (!admin.ok) {
      return admin.response;
    }

    const { userId, moduleId, status } = await request.json();

    if (!userId || !moduleId || !ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: 'userId, moduleId et status valide requis' },
        { status: 400 }
      );
    }

    const validationModule = await prisma.module.findFirst({
      where: {
        id: moduleId,
        title: { startsWith: 'PHASE 7' },
        formation: { targetRole: 'EMPLOYEE' },
      },
      select: {
        id: true,
        formationId: true,
      },
    });

    if (!validationModule) {
      return NextResponse.json({ error: 'Module de validation introuvable' }, { status: 404 });
    }

    const employee = await prisma.user.findFirst({
      where: {
        id: userId,
        role: 'EMPLOYEE',
        isActive: true,
      },
      select: { id: true },
    });

    if (!employee) {
      return NextResponse.json({ error: 'Employé introuvable' }, { status: 404 });
    }

    const reviewedAt = status === 'PENDING' ? null : new Date();
    const validation = await prisma.phaseValidation.upsert({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        },
      },
      create: {
        userId,
        moduleId,
        status: status as PhaseValidationStatusValue,
        reviewedById: admin.user.id,
        reviewedAt,
      },
      update: {
        status: status as PhaseValidationStatusValue,
        reviewedById: admin.user.id,
        reviewedAt,
      },
    });

    await syncFormationProgress(userId, validationModule.formationId);

    return NextResponse.json({ validation });
  } catch (error) {
    console.error('Error updating admin phase validation:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
