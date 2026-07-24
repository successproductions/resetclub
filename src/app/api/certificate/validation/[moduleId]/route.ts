import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { getCurrentAcademySession } from '@/lib/auth/academy-session';
import prisma from '@/lib/prisma';

function formatFrenchDate(date: Date) {
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getSafeFilename(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, '_');
}

// GET /api/certificate/validation/[moduleId] - Generate Phase 7 certificate after admin validation
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const session = await getCurrentAcademySession(request);
    if (!session.ok) {
      return NextResponse.json({ error: session.error }, { status: session.status });
    }

    const { moduleId } = await params;
    const validationModule = await prisma.module.findFirst({
      where: {
        id: moduleId,
        title: { startsWith: 'PHASE 7' },
      },
      select: {
        id: true,
        formationId: true,
      },
    });

    if (!validationModule) {
      return NextResponse.json({ error: 'Module de validation introuvable' }, { status: 404 });
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_formationId: {
          userId: session.user.id,
          formationId: validationModule.formationId,
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Vous n\'êtes pas inscrit à cette formation' },
        { status: 403 }
      );
    }

    const validation = await prisma.phaseValidation.findUnique({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId,
        },
      },
    });

    if (validation?.status !== 'VALIDATED') {
      return NextResponse.json(
        { error: 'La Phase 7 doit être validée par un admin pour obtenir ce certificat' },
        { status: 403 }
      );
    }

    const pdfPath = path.join(process.cwd(), 'public', 'pdf', 'CERTIFICAT-E-LEARNING.pdf');
    const existingPdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const page = pages[pages.length - 1];
    const { width } = page.getSize();
    const nameFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const dateFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const fullName =
      session.user.firstName && session.user.lastName
        ? `${session.user.firstName} ${session.user.lastName}`.toUpperCase()
        : session.user.email.toUpperCase();
    const dateStr = formatFrenchDate(validation.reviewedAt || validation.updatedAt || new Date());
    const nameSize = fullName.length > 32 ? 18 : 22;
    const dateSize = 10;
    const nameWidth = nameFont.widthOfTextAtSize(fullName, nameSize);
    const dateWidth = dateFont.widthOfTextAtSize(dateStr, dateSize);

    page.drawText(fullName, {
      x: (width - nameWidth) / 2,
      y: 288,
      size: nameSize,
      font: nameFont,
      color: rgb(0.18, 0.18, 0.18),
    });

    page.drawText(dateStr, {
      x: 690 - dateWidth / 2,
      y: 92,
      size: dateSize,
      font: dateFont,
      color: rgb(0.18, 0.18, 0.18),
    });

    const pdfBytes = await pdfDoc.save();
    const safeName = getSafeFilename(fullName);

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Certificat_Validation_ResetClub_${safeName}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error generating validation certificate:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération du certificat' },
      { status: 500 }
    );
  }
}
